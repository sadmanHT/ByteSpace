import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

function collectFailures(page: import("@playwright/test").Page) {
  const failures: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") failures.push(message.text());
  });
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });

  return failures;
}

async function expectAccessible(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
}

test("Search/Courses matches native Figma geometry and supports discovery", async ({
  page,
}, testInfo) => {
  const failures = collectFailures(page);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/courses");
  await page.waitForLoadState("networkidle");

  const pageGeometry = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
  }));
  expect(pageGeometry).toEqual({ height: 3853, width: 1440 });

  await expect(page.getByRole("heading", { name: "Find Your Next Course" })).toBeVisible();
  await expect(page.locator(".bs-course-card")).toHaveCount(18);

  const firstCard = page.locator(".bs-course-card").first();
  const firstBox = await firstCard.boundingBox();
  expect(Math.round(firstBox?.x ?? 0)).toBe(121);
  expect(Math.round(firstBox?.y ?? 0)).toBe(632);

  const search = page.getByRole("searchbox", { name: "Search course catalogue" });
  await search.fill("Mastering Money");
  await expect(page.locator(".bs-course-card")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Mastering Money Management" })).toBeVisible();

  await search.clear();
  await expect(page.locator(".bs-course-card")).toHaveCount(18);

  await page.getByRole("button", { name: "Music" }).click();
  await expect(page.getByRole("heading", { name: "No courses found" })).toBeVisible();

  await page.getByRole("button", { name: "Featured" }).click();
  await expect(page.locator(".bs-course-card")).toHaveCount(18);

  await page.getByRole("button", { name: "Page 2" }).click();
  await expect(page.getByRole("button", { name: "Page 2" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.locator(".bs-course-card").first()).toContainText("Build Digital Asset");

  await page.selectOption("select[aria-label='Sort courses']", "title-asc");
  await expect(page.locator(".bs-course-card").first()).toContainText("Balancing Productivity");

  await page.getByRole("link", { name: "Balancing Productivity and Self-Care" }).first().click();
  await expect(
    page.getByRole("heading", { name: "Balancing Productivity and Self-Care" }),
  ).toBeVisible();

  expect(failures).toEqual([]);
  await expectAccessible(page);

  await testInfo.attach("phase7-search-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

test("Creator Profile matches native Figma structure and exposes honest local follow state", async ({
  page,
}, testInfo) => {
  const failures = collectFailures(page);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/creators/purepearl-studio");
  await page.waitForLoadState("networkidle");

  const pageGeometry = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
  }));
  expect(pageGeometry).toEqual({ height: 2136, width: 1440 });

  await expect(page.getByRole("heading", { name: "PurePearl Studio" })).toBeVisible();
  await expect(page.getByText("Passionate UI/UX, Web designer")).toBeVisible();
  await expect(page.locator(".bs-course-card")).toHaveCount(6);

  const follow = page.getByRole("button", { name: "Follow" });
  await expect(follow).toHaveAttribute("aria-pressed", "false");
  await follow.click();
  await expect(page.getByRole("button", { name: "Following" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.selectOption("select[aria-label='Creator course level']", "advanced");
  await expect(page.getByRole("heading", { name: "No courses found" })).toBeVisible();

  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".bs-course-card")).toHaveCount(6);

  await page.selectOption("select[aria-label='Sort creator courses']", "title-asc");
  await expect(page.locator(".bs-course-card").first()).toContainText("Balancing Productivity");

  await page.getByRole("link", { name: "Balancing Productivity and Self-Care" }).click();
  await expect(
    page.getByRole("heading", { name: "Balancing Productivity and Self-Care" }),
  ).toBeVisible();
  await page.goBack();

  await page.locator(".bs-footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".bs-footer")).toBeVisible();

  expect(failures).toEqual([]);
  await expectAccessible(page);

  await testInfo.attach("phase7-creator-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

test("Phase 7 discovery routes stay usable without horizontal overflow at 390px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/courses", "/creators/purepearl-studio"]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const geometry = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));

    expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);
  }
});

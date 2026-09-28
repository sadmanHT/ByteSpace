import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("course catalogue matches the Figma card foundation and supports discovery", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  const failedResponses: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/courses");
  await page.waitForLoadState("networkidle");

  const cards = page.locator(".bs-course-card");
  await expect(cards).toHaveCount(3);

  const firstBox = await cards.nth(0).boundingBox();
  const secondBox = await cards.nth(1).boundingBox();
  expect(Math.round(firstBox?.width ?? 0)).toBe(373);
  expect(Math.round(firstBox?.height ?? 0)).toBe(384);
  expect(Math.round((secondBox?.x ?? 0) - (firstBox?.x ?? 0))).toBe(413);

  const search = page.getByRole("searchbox", { name: "Search course catalogue" });
  await search.fill("Mastering Money");
  await expect(cards).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "Mastering Money Management" }),
  ).toBeVisible();

  await search.clear();
  await expect(cards).toHaveCount(3);

  await page.getByRole("button", { name: "Page 2" }).click();
  await expect(
    page.getByRole("link", { name: "Balancing Productivity and Self-Care" }),
  ).toBeVisible();

  await page.selectOption("select[aria-label='Level']", "advanced");
  await expect(page.getByRole("heading", { name: "No courses found" })).toBeVisible();

  await page.selectOption("select[aria-label='Level']", "beginner");
  await expect(page.getByRole("button", { name: "Page 1" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.getByRole("link", { name: "Learn Figma from Basic" }).click();
  await expect(page.getByRole("heading", { name: "Learn Figma from Basic" })).toBeVisible();
  await page.getByRole("link", { name: "Back to courses" }).click();
  await expect(page.getByTestId("course-catalogue-page")).toBeVisible();

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(accessibility.violations).toEqual([]);
  expect(errors).toEqual([]);
  expect(failedResponses).toEqual([]);

  await testInfo.attach("course-catalogue-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

test("course catalogue remains usable at a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/courses");
  await page.waitForLoadState("networkidle");

  const geometry = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);

  const firstCourse = page.getByRole("link", { name: "Learn Figma from Basic" });
  await firstCourse.focus();
  await expect(firstCourse).toBeFocused();
});

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

test("Phase 8 course routes preserve the native desktop frame geometry and route navigation", async ({
  page,
}, testInfo) => {
  const failures = collectFailures(page);
  await page.setViewportSize({ width: 1440, height: 1000 });

  await page.goto("/courses/build-digital-asset");
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("heading", { name: "Build Digital Asset: A Comprehensive Guide" }),
  ).toBeVisible();
  await expect(page.getByText("$25")).toBeVisible();
  await expect(page.locator(".bs-course-enrollment")).toHaveCSS("width", "412px");
  await expect(page.locator(".bs-course-media")).toHaveCSS("width", "720px");
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(2717);
  await testInfo.attach("phase8-course-about-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  await page.getByRole("link", { name: "Lesson" }).click();
  await expect(page).toHaveURL(/\/courses\/build-digital-asset\/lessons$/);
  await expect(page.getByRole("progressbar", { name: "Learning progress 55%" })).toHaveAttribute(
    "value",
    "55",
  );
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(2883);
  await testInfo.attach("phase8-course-lessons-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  await page.getByRole("link", { name: "Reviews" }).click();
  await expect(page).toHaveURL(/\/courses\/build-digital-asset\/reviews$/);
  await expect(page.getByText("What Learners Are Saying")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(3449);
  await page.getByRole("button", { name: "5" }).click();
  await expect(page.locator(".bs-course-review-card")).toHaveCount(4);
  await page.getByRole("button", { name: "All rating" }).click();
  await expect(page.locator(".bs-course-review-card")).toHaveCount(4);
  await testInfo.attach("phase8-course-reviews-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/courses\/build-digital-asset$/);

  await page.getByRole("link", { name: "See Full Profile" }).click();
  await expect(page).toHaveURL(/\/creators\/purepearl-studio$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/courses\/build-digital-asset$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/courses\/build-digital-asset\/reviews$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/courses\/build-digital-asset$/);

  expect(failures).toEqual([]);
  await expectAccessible(page);
});

test("Phase 8 sharing uses clipboard fallback and enrollment remains honest", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) =>
          window.sessionStorage.setItem("copied-course-url", value),
      },
    });
  });
  await page.goto("/courses/build-digital-asset");
  await page.getByRole("button", { name: "Share" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Course link copied" })).toBeAttached();
  await expect
    .poll(() => page.evaluate(() => window.sessionStorage.getItem("copied-course-url")))
    .toContain("/courses/build-digital-asset");

  await page.getByRole("button", { name: "Enroll Now" }).click();
  await expect(
    page.getByText("Enrollment checkout is not connected because no payment backend was supplied."),
  ).toBeVisible();

  await page.getByRole("button", { name: "Play course preview" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "does not include a video source" }),
  ).toBeAttached();
});

test("Phase 8 course ecosystem remains usable without horizontal overflow at 390px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/courses/build-digital-asset",
    "/courses/build-digital-asset/lessons",
    "/courses/build-digital-asset/reviews",
  ]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const geometry = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    }));
    expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);
  }
});

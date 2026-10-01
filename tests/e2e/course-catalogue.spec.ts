import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("course catalogue preserves the shared Figma card foundation inside Phase 7 Search", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/courses");
  await page.waitForLoadState("networkidle");

  const cards = page.locator(".bs-course-card");
  await expect(cards).toHaveCount(18);

  const firstBox = await cards.nth(0).boundingBox();
  const secondBox = await cards.nth(1).boundingBox();
  expect(Math.round(firstBox?.width ?? 0)).toBe(373);
  expect(Math.round(firstBox?.height ?? 0)).toBe(384);
  expect(Math.round((secondBox?.x ?? 0) - (firstBox?.x ?? 0))).toBe(413);

  const firstMedia = cards.nth(0).locator(".bs-course-card__media");
  const mediaBox = await firstMedia.boundingBox();
  expect(Math.round(mediaBox?.width ?? 0)).toBe(341);
  expect(Math.round(mediaBox?.height ?? 0)).toBe(195);

  await testInfo.attach("course-catalogue-phase7-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(accessibility.violations).toEqual([]);
});

test("course-card visual fixture covers long, variant, and narrow states", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/course-card-fixture");
  await page.waitForLoadState("networkidle");

  await expect(page.locator(".bs-course-card")).toHaveCount(4);
  await expect(page.getByText("Balancing Productivity and Self-Care")).toBeVisible();
  await expect(page.locator(".bs-course-card__level--success")).toHaveCount(1);
  await expect(page.locator(".bs-avatar-stack--dark")).toHaveCount(1);

  await testInfo.attach("course-card-states-1440", {
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

  const firstCourse = page.getByRole("link", { name: "Learn Figma from Basic" }).first();
  await firstCourse.focus();
  await expect(firstCourse).toBeFocused();
});

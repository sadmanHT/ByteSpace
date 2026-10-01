import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Home matches the flagship Figma flow and core interactions", async ({ page }, testInfo) => {
  const errors: string[] = [];
  const failedResponses: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedResponses.push(String(response.status()) + " " + response.url());
    }
  });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Get Access to Hundreds Courses Available",
    }),
  ).toBeVisible();

  const pageGeometry = await page.evaluate(() => ({
    documentHeight: document.documentElement.scrollHeight,
    documentWidth: document.documentElement.scrollWidth,
  }));
  expect(pageGeometry.documentWidth).toBe(1440);
  expect(pageGeometry.documentHeight).toBe(6377);

  const hero = page.getByTestId("home-hero");
  const heroBox = await hero.boundingBox();
  expect(Math.round(heroBox?.width ?? 0)).toBe(1440);
  expect(Math.round(heroBox?.height ?? 0)).toBe(1024);

  const search = page.getByRole("searchbox", { name: "Search courses" });
  await search.fill("Mastering Money");
  await page.getByTestId("home-hero").getByRole("button", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/courses\?query=Mastering(?:\+|%20)Money/);
  await expect(page.getByRole("link", { name: "Mastering Money Management" })).toBeVisible();

  await page.goBack();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Get Access to Hundreds Courses Available",
    }),
  ).toBeVisible();

  const music = page.getByRole("button", { name: "Music" });
  await music.click();
  await expect(music).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("link", { name: "Learn Figma from Basic" }).first().click();
  await expect(page.getByRole("heading", { name: "Learn Figma from Basic" })).toBeVisible();

  await page.goBack();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Get Access to Hundreds Courses Available",
    }),
  ).toBeVisible();

  const creatorCta = page.getByRole("link", { name: "Join as Creator" });
  await creatorCta.scrollIntoViewIfNeeded();
  await creatorCta.click();
  await expect(page).toHaveURL(/\/creators$/);
  await expect(page.getByTestId("creator-profile-page")).toBeVisible();
  await expect(page.getByRole("heading", { name: "PurePearl Studio" })).toBeVisible();

  await page.goBack();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Get Access to Hundreds Courses Available",
    }),
  ).toBeVisible();

  await expect(page.locator(".bs-footer")).toBeVisible();

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(accessibility.violations).toEqual([]);
  expect(errors).toEqual([]);
  expect(failedResponses).toEqual([]);

  const captures = [
    ["home-full-page", page.locator("body")],
    ["home-hero", page.getByTestId("home-hero")],
    ["home-course-grid", page.getByTestId("home-course-grid")],
    ["home-editorial", page.getByTestId("home-editorial")],
    ["home-creator-cta", page.getByTestId("home-creator-cta")],
    ["home-testimonials", page.getByTestId("home-testimonials")],
    ["home-footer", page.locator(".bs-footer")],
  ] as const;

  for (const [name, locator] of captures) {
    await locator.scrollIntoViewIfNeeded();
    await testInfo.attach(name, {
      body: await locator.screenshot(),
      contentType: "image/png",
    });
  }
});

test("Home has no horizontal overflow and remains keyboard usable at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Get Access to Hundreds Courses Available",
    }),
  ).toBeVisible();

  const geometry = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);

  const search = page.getByRole("searchbox", { name: "Search courses" });
  await search.focus();
  await expect(search).toBeFocused();

  const category = page.getByRole("button", { name: "Music" });
  await category.focus();
  await expect(category).toBeFocused();

  const creator = page.getByRole("link", { name: "Join as Creator" });
  await creator.scrollIntoViewIfNeeded();
  await creator.focus();
  await expect(creator).toBeFocused();
});

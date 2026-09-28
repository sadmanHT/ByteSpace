import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("shared shell and reusable controls work at the Figma desktop reference", async ({
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
  await page.goto("/shared-ui");
  const fixture = page.getByTestId("shared-ui-fixture");
  await expect(fixture).toBeVisible();

  const header = page.locator(".bs-site-header");
  await expect(header).toHaveCSS("height", "120px");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "ByteSpace home" }).first()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Home" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Courses" }),
  ).toBeFocused();

  const logo = page.locator(".bs-site-header__logo");
  const logoBox = await logo.boundingBox();
  expect(Math.round(logoBox?.x ?? 0)).toBe(122);
  expect(Math.round(logoBox?.y ?? 0)).toBe(35);

  const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
  await primaryNavigation.getByRole("link", { name: "Courses", exact: true }).click();
  await expect(page).toHaveURL(/\/courses$/);
  await expect(
    page.getByRole("heading", { name: "Course catalogue foundation route." }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/shared-ui");
  const search = page.getByRole("searchbox", { name: "Search courses" });
  await search.focus();
  await expect(search).toBeFocused();

  await page.getByRole("button", { name: "Music" }).click();
  await expect(page.getByRole("button", { name: "Music" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Page 2" }).click();
  await expect(page.getByRole("button", { name: "Page 2" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  const newsletter = page.getByRole("textbox", { name: "Email address" });
  await newsletter.scrollIntoViewIfNeeded();
  await newsletter.focus();
  await expect(newsletter).toBeFocused();

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(errors).toEqual([]);
  expect(failedResponses).toEqual([]);

  await testInfo.attach("shared-ui-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

test("shared shell does not overflow a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shared-ui");
  const geometry = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));

  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);

  await page.getByRole("link", { name: "ByteSpace home" }).first().focus();
  await expect(page.getByRole("link", { name: "ByteSpace home" }).first()).toBeFocused();
});

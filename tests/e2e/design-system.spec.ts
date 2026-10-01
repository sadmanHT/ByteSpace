import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("design-system fixture matches the native Figma foundation", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/design-system");
  await page.waitForLoadState("networkidle");

  const fixture = page.getByTestId("design-system-fixture");
  await expect(fixture).toBeVisible();

  const container = fixture.locator(".bs-container").first();
  const containerBox = await container.boundingBox();

  expect(containerBox).not.toBeNull();
  expect(Math.round(containerBox?.width ?? 0)).toBe(1200);
  expect(Math.round(containerBox?.x ?? 0)).toBe(120);

  const grid = page.getByTestId("reference-grid");
  await expect(grid.locator(":scope > *")).toHaveCount(12);

  const tokenValues = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string) => styles.getPropertyValue(name).trim();

    return {
      blue50: read("--bs-blue-50"),
      blue800: read("--bs-blue-800"),
      blue950: read("--bs-blue-950"),
      lime400: read("--bs-lime-400"),
      neutral50: read("--bs-neutral-50"),
      neutral400: read("--bs-neutral-400"),
      neutral700: read("--bs-neutral-700"),
      neutral950: read("--bs-neutral-950"),
      contentMax: read("--bs-content-max"),
      gutter: read("--bs-grid-gutter"),
    };
  });

  expect(tokenValues).toEqual({
    blue50: "#e7f6ff",
    blue800: "#003be2",
    blue950: "#071e5f",
    lime400: "#d4fb20",
    neutral50: "#f5f5f6",
    neutral400: "#82868e",
    neutral700: "#4b4c53",
    neutral950: "#242528",
    contentMax: "75rem",
    gutter: "2.5rem",
  });

  const headingMetrics = await page.getByTestId("heading-m-sample").evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      lineHeight: styles.lineHeight,
      letterSpacing: styles.letterSpacing,
    };
  });

  expect(headingMetrics.fontFamily).toContain("Poppins");
  expect(headingMetrics.fontSize).toBe("44px");
  expect(headingMetrics.fontWeight).toBe("600");
  expect(headingMetrics.lineHeight).toBe("52.8px");
  expect(headingMetrics.letterSpacing).toBe("-0.44px");

  const fontStatus = await page.evaluate(async () => {
    const specs = {
      poppinsRegular: "400 16px Poppins",
      poppinsMedium: "500 16px Poppins",
      poppinsSemiBold: "600 44px Poppins",
      satoshiRegular: "400 16px Satoshi",
      satoshiMedium: "500 16px Satoshi",
      satoshiBold: "700 16px Satoshi",
      clashDisplayBold: '700 20px "Clash Display"',
    };

    const entries = await Promise.all(
      Object.entries(specs).map(async ([name, spec]) => {
        const faces = await document.fonts.load(spec, "ByteSpace");
        return [name, faces.length > 0] as const;
      }),
    );

    return Object.fromEntries(entries);
  });

  expect(fontStatus).toEqual({
    poppinsRegular: true,
    poppinsMedium: true,
    poppinsSemiBold: true,
    satoshiRegular: true,
    satoshiMedium: true,
    satoshiBold: true,
    clashDisplayBold: true,
  });

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(accessibility.violations).toEqual([]);

  await testInfo.attach("design-system-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

test("design-system foundation does not overflow a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/design-system");
  await page.waitForLoadState("networkidle");

  await expect(page.getByTestId("design-system-fixture")).toBeVisible();

  const viewportGeometry = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(viewportGeometry.documentWidth).toBeLessThanOrEqual(viewportGeometry.viewportWidth);

  const primaryAction = page.getByRole("button", { name: "Primary action" });
  await primaryAction.focus();
  await expect(primaryAction).toBeFocused();
});

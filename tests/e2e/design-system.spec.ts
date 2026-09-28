import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("design-system fixture matches the documented desktop foundation", async ({ page }, testInfo) => {
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

  const fontStatus = await page.evaluate(async () => {
    await document.fonts.ready;
    const faces = Array.from(document.fonts).map((face) => ({
      family: face.family.replaceAll('"', "").replaceAll("'", ""),
      status: face.status,
    }));

    return {
      poppins: faces.some((face) => face.family === "Poppins" && face.status === "loaded"),
      satoshi: faces.some((face) => face.family === "Satoshi" && face.status === "loaded"),
    };
  });

  expect(fontStatus.poppins).toBe(true);
  expect(fontStatus.satoshi).toBe(true);

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(accessibility.violations).toEqual([]);

  await testInfo.attach("design-system-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});

import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/register",
  "/login",
  "/courses",
  "/courses/build-digital-asset",
  "/courses/build-digital-asset/lessons",
  "/courses/build-digital-asset/reviews",
  "/creators/purepearl-studio",
  "/404",
] as const;

test("Phase 9 cross-browser route smoke stays stable at desktop and narrow widths", async ({
  browserName,
  page,
}) => {
  test.slow();
  const failures: string[] = [];

  page.on("console", (message) => {
    const expectedDocument404 =
      message.type() === "error" &&
      message.text().includes("Failed to load resource: the server responded with a status of 404");
    const interruptedFirefoxImage =
      browserName === "firefox" &&
      message.type() === "error" &&
      message.text().includes('Image corrupt or truncated.');

    if (message.type() === "error" && !expectedDocument404 && !interruptedFirefoxImage) {
      failures.push(message.text());
    }
  });
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    const expectedDocument404 =
      response.status() === 404 && response.request().resourceType() === "document";

    if (response.status() >= 400 && !expectedDocument404) {
      failures.push(`${response.status()} ${response.url()}`);
    }
  });

  for (const width of [1280, 390] as const) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });

    for (const route of routes) {
      await page.goto(route, { waitUntil: "load" });
      await expect(page.locator("main").first()).toBeVisible();

      const geometry = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);
    }
  }

  await page.goto("/courses/build-digital-asset");
  await page.getByRole("button", { name: "Share" }).click();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: /Share sheet opened|Course link copied|Unable to share/ }),
  ).toBeAttached();

  expect(failures).toEqual([]);
});

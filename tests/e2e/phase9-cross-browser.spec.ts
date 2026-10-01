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
  page,
}) => {
  test.slow();
  const failures: string[] = [];

  page.on("console", (message) => {
    const expectedDocument404 =
      message.type() === "error" &&
      message.text().includes("Failed to load resource: the server responded with a status of 404");

    if (message.type() === "error" && !expectedDocument404) failures.push(message.text());
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

      const geometry = await page.evaluate(() => {
        const viewportWidth = window.innerWidth;
        const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            const className =
              typeof element.className === "string"
                ? element.className.trim().replace(/\\s+/g, ".")
                : "";
            const selector = element.id
              ? `#${element.id}`
              : `${element.tagName.toLowerCase()}${className ? `.${className}` : ""}`;

            return {
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              selector,
              width: Math.round(rect.width),
            };
          })
          .filter(
            ({ left, right, width }) =>
              width > 0 && (left < 0 || right > viewportWidth),
          )
          .slice(0, 6);

        return {
          documentWidth: document.documentElement.scrollWidth,
          offenders,
          viewportWidth,
        };
      });

      expect(
        geometry.documentWidth,
        `${route} at ${width}px overflowed: ${JSON.stringify(geometry.offenders)}`,
      ).toBeLessThanOrEqual(geometry.viewportWidth);
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

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
            return {
              selector:
                element.id
                  ? `#${element.id}`
                  : element.className && typeof element.className === "string"
                    ? `${element.tagName.toLowerCase()}.${element.className.trim().split(/\\s+/).join(".")}`
                    : element.tagName.toLowerCase(),
              left: Math.round(rect.left * 10) / 10,
              right: Math.round(rect.right * 10) / 10,
              width: Math.round(rect.width * 10) / 10,
            };
          })
          .filter(({ left, right, width }) => width > 0 && (left < -0.5 || right > viewportWidth + 0.5))
          .sort((a, b) => Math.max(b.right - viewportWidth, -b.left) - Math.max(a.right - viewportWidth, -a.left))
          .slice(0, 8);

        return {
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth,
          offenders,
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

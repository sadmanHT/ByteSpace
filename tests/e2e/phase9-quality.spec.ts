import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { id: "home", path: "/", title: "ByteSpace" },
  { id: "register", path: "/register", title: "Register | ByteSpace" },
  { id: "login", path: "/login", title: "Login | ByteSpace" },
  { id: "courses", path: "/courses", title: "Courses | ByteSpace" },
  {
    id: "course-details",
    path: "/courses/build-digital-asset",
    title: "Build Digital Asset: A Comprehensive Guide | ByteSpace",
  },
  {
    id: "course-lessons",
    path: "/courses/build-digital-asset/lessons",
    title: "Build Digital Asset: A Comprehensive Guide Lessons | ByteSpace",
  },
  {
    id: "course-reviews",
    path: "/courses/build-digital-asset/reviews",
    title: "Build Digital Asset: A Comprehensive Guide Reviews | ByteSpace",
  },
  {
    id: "creator-profile",
    path: "/creators/purepearl-studio",
    title: "PurePearl Studio | ByteSpace",
  },
  { id: "not-found", path: "/404", title: "Page not found | ByteSpace" },
] as const;

const viewportWidths = [1440, 1280, 1024, 768, 390, 320] as const;

function collectFailures(page: import("@playwright/test").Page) {
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

  return failures;
}

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const geometry = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));

  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);
}

async function expectKeyboardReachable(page: import("@playwright/test").Page) {
  const firstFocusable = page
    .locator(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    .first();

  await firstFocusable.focus();
  await expect(firstFocusable).toBeFocused();
  await page.keyboard.press("Tab");

  const stillOnPage = await page.evaluate(() => {
    const active = document.activeElement;
    return Boolean(active && active !== document.body && active !== document.documentElement);
  });
  expect(stillOnPage).toBe(true);
}

async function expectAccessible(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
}

for (const route of routes) {
  test(`Phase 9 ${route.id} works across the required viewport matrix`, async ({
    page,
  }, testInfo) => {
    test.slow();
    const failures = collectFailures(page);

    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 });
      await page.goto(route.path, { waitUntil: "load" });

      await expect(page.locator("main").first()).toBeVisible();
      await expectNoHorizontalOverflow(page);

      if (width === 1440) {
        expect(await page.title()).toBe(route.title);
        await testInfo.attach(`phase9-${route.id}-1440`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }

      if (width === 320) {
        await page.reload({ waitUntil: "load" });
        await expectNoHorizontalOverflow(page);
        await expectKeyboardReachable(page);
        await expectAccessible(page);
      }
    }

    expect(failures).toEqual([]);
  });
}

test("Phase 9 internal navigation remains route-backed and browser-friendly", async ({ page }) => {
  const journeys: ReadonlyArray<{
    from: string;
    target: string | RegExp;
    click: () => ReturnType<typeof page.getByRole>;
  }> = [
    {
      from: "/",
      target: /\/courses$/,
      click: () =>
        page
          .getByRole("navigation", { name: "Primary" })
          .getByRole("link", { name: "Courses", exact: true }),
    },
    {
      from: "/register",
      target: /\/login$/,
      click: () => page.getByRole("link", { name: "Login", exact: true }),
    },
    {
      from: "/login",
      target: /\/register$/,
      click: () => page.getByRole("link", { name: "Create an account", exact: true }),
    },
    {
      from: "/courses",
      target: /\/courses\/build-digital-asset$/,
      click: () => page.getByRole("link", { name: "Build Digital Asset", exact: true }).first(),
    },
    {
      from: "/courses/build-digital-asset",
      target: /\/courses\/build-digital-asset\/lessons$/,
      click: () =>
        page
          .getByRole("navigation", { name: "Course sections" })
          .getByRole("link", { name: "Lesson", exact: true }),
    },
    {
      from: "/courses/build-digital-asset/lessons",
      target: /\/courses\/build-digital-asset\/reviews$/,
      click: () =>
        page
          .getByRole("navigation", { name: "Course sections" })
          .getByRole("link", { name: "Reviews", exact: true }),
    },
    {
      from: "/courses/build-digital-asset/reviews",
      target: /\/courses\/build-digital-asset$/,
      click: () =>
        page
          .getByRole("navigation", { name: "Course sections" })
          .getByRole("link", { name: "About", exact: true }),
    },
    {
      from: "/creators/purepearl-studio",
      target: /\/courses\/build-digital-asset$/,
      click: () => page.getByRole("link", { name: "Build Digital Asset", exact: true }),
    },
    {
      from: "/404",
      target: /\/$/,
      click: () => page.getByRole("link", { name: "Back to Home", exact: true }),
    },
  ];

  for (const journey of journeys) {
    await page.goto(journey.from);
    await journey.click().click();
    await expect(page).toHaveURL(journey.target);
  }
});

test("Phase 9 layouts remain usable at the 720 CSS-pixel equivalent of 200% zoom", async ({
  page,
}) => {
  await page.setViewportSize({ width: 720, height: 900 });

  for (const route of routes) {
    await page.goto(route.path, { waitUntil: "load" });
    await expectNoHorizontalOverflow(page);
  }
});

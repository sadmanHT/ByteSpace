import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

function collectPageFailures(page: import("@playwright/test").Page) {
  const failures: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") failures.push(message.text());
  });
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().includes("/definitely-missing-phase-6")) {
      failures.push(`${response.status()} ${response.url()}`);
    }
  });

  return failures;
}

async function expectNoAxeViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
}

test("Register matches the desktop auth frame and validates accessibly", async ({
  page,
}, testInfo) => {
  const failures = collectPageFailures(page);
  const credentialLeak: string[] = [];

  page.on("console", (message) => {
    const text = message.text();
    if (text.includes("learner@example.com") || text.includes("phase6-secret")) {
      credentialLeak.push(text);
    }
  });

  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto("/register");
  await page.waitForLoadState("networkidle");

  const geometry = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
  }));
  expect(geometry).toEqual({ height: 1024, width: 1440 });

  const panel = page.locator(".bs-auth-panel");
  const panelBox = await panel.boundingBox();
  expect(Math.round(panelBox?.x ?? 0)).toBe(741);
  expect(Math.round(panelBox?.y ?? 0)).toBe(120);
  expect(Math.round(panelBox?.width ?? 0)).toBe(579);
  expect(Math.round(panelBox?.height ?? 0)).toBe(784);

  await testInfo.attach("register-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
  await testInfo.attach("register-form-panel", {
    body: await panel.screenshot(),
    contentType: "image/png",
  });
  await testInfo.attach("register-editorial-composition", {
    body: await page.locator(".bs-auth-editorial").screenshot(),
    contentType: "image/png",
  });

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "ByteSpace home" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Full Name")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Email")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Password")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Continue" })).toBeFocused();

  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();
  await expect(page.getByText("Enter your email address.")).toBeVisible();
  await expect(page.getByText("Enter your password.")).toBeVisible();

  await page.getByLabel("Full Name").fill("Jamie Davis");
  await page.getByLabel("Email").fill("invalid");
  await page.getByLabel("Password").fill("phase6-secret");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();

  await page.getByLabel("Email").fill("learner@example.com");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("status")).toContainText("Authentication is not connected");

  expect(credentialLeak).toEqual([]);
  expect(failures).toEqual([]);
  await expectNoAxeViolations(page);
});

test("Login validates, stays frontend-only, and links to registration", async ({
  page,
}, testInfo) => {
  const failures = collectPageFailures(page);

  await page.setViewportSize({ width: 1440, height: 1024 });
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { name: "Sign In", exact: true })).toBeVisible();
  await expect(page.getByLabel("Password")).toHaveAttribute("type", "password");

  await testInfo.attach("login-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Enter your email address.")).toBeVisible();
  await expect(page.getByText("Enter your password.")).toBeVisible();

  await page.getByLabel("Email").fill("wrong-email");
  await page.getByLabel("Password").fill("phase6-secret");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();

  await page.getByLabel("Email").fill("learner@example.com");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByRole("status")).toContainText("Authentication is not connected");

  await expect(page.getByRole("link", { name: "Create an account" })).toHaveAttribute(
    "href",
    "/register",
  );

  expect(failures).toEqual([]);
  await expectNoAxeViolations(page);
});

test("framework unknown routes and explicit 404 route share the ByteSpace experience", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto("/definitely-missing-phase-6");
  await expect(
    page.getByRole("heading", { name: "The page you are looking for doesn't exist" }),
  ).toBeVisible();

  const unknownGeometry = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
  }));
  expect(unknownGeometry.width).toBe(1440);
  expect(unknownGeometry.height).toBe(1485);

  await expectNoAxeViolations(page);
  await testInfo.attach("404-unknown-1440", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
  await testInfo.attach("404-hero", {
    body: await page.locator(".bs-not-found__blue").screenshot(),
    contentType: "image/png",
  });
  await testInfo.attach("404-footer", {
    body: await page.locator(".bs-footer").screenshot(),
    contentType: "image/png",
  });

  await page.getByRole("link", { name: "Back to Home" }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/404");
  await expect(
    page.getByText("Try to use a correct url or go back to homepage to start again"),
  ).toBeVisible();
});

test("auth and not-found experiences do not overflow at a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of ["/register", "/login", "/definitely-missing-phase-6"]) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const geometry = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));

    expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);
  }
});

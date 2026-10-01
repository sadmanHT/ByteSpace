import { defineConfig, devices } from "@playwright/test";

const externalBaseURL = process.env.PLAYWRIGHT_TEST_BASE_URL;
const baseURL = externalBaseURL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["line"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testMatch: /phase9-cross-browser\.spec\.ts/,
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testMatch: /phase9-cross-browser\.spec\.ts/,
      use: { ...devices["Desktop Safari"] },
    },
  ],
  ...(externalBaseURL
    ? {}
    : {
        webServer: {
          command: process.env.CI ? "pnpm start" : "pnpm dev",
          url: baseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }),
});

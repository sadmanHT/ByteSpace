import { expect, test } from "@playwright/test";

test("home route renders and client interaction works", async ({ page }) => {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Engineering foundation ready for the Figma implementation.",
    }),
  ).toBeVisible();

  const interactionButton = page.getByRole("button", { name: "Run interaction check" });
  await interactionButton.focus();
  await expect(interactionButton).toBeFocused();
  await interactionButton.press("Enter");

  await expect(page.getByRole("status")).toHaveText("Client-side interaction is working.");
  expect(errors).toEqual([]);
});

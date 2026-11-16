import { expect, test } from "@playwright/test";

test("chat starts in an actionable empty state", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/chat");
  await expect(page.getByText("Ask about your frontend project.")).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Message" })).toBeVisible();
});

import test, { expect } from "playwright/test";

test("Drag and drop within iframe", async ({ page }) => {
  await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

  await frame
    .locator("li", { hasText: "High Tatras 2" })
    .dragTo(frame.locator('[id="trash"]'));
  await expect(frame.locator('[id="trash"] li h5')).toHaveText("High Tatras 2");

  // more precise control
  await frame.locator("li", { hasText: "High Tatras 4" }).hover();
  await page.mouse.down();
  await frame.locator('[id="trash"]').hover();
  await page.mouse.up();
  await expect(frame.locator('[id="trash"] li h5')).toHaveText([
    "High Tatras 2",
    "High Tatras 4",
  ]);
});

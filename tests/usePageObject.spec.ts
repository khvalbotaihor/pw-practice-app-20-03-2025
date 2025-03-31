import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigation to the form page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.formLayoutsPage();
  expect(page.url()).toBe("http://localhost:4200/pages/forms/layouts");
});

test("navigation to the datepicker page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.datepickerPage();
  await page.waitForTimeout(500);
  expect(page.url()).toBe("http://localhost:4200/pages/forms/datepicker");
});

test("navigation to the toaster page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.toasterPage();
  await page.waitForTimeout(500);
  expect(page.url()).toBe("http://localhost:4200/pages/modal-overlays/toastr");
});
test("navigation to the tooltip page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.tooltipPage();
  await page.waitForTimeout(500);

  expect(page.url()).toBe("http://localhost:4200/pages/modal-overlays/tooltip");
});
test("navigation to the smart table page", async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  await navigateTo.smartTablePage();
  await page.waitForTimeout(500);

  expect(page.url()).toBe("http://localhost:4200/pages/tables/smart-table");
});

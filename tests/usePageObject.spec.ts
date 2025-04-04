import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigation to the form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  expect(page.url()).toBe("http://localhost:4200/pages/forms/layouts");
  //datepicker page
  await pm.navigateTo().datepickerPage();
  expect(page.url()).toBe("http://localhost:4200/pages/forms/datepicker");
  //toastr page
  await pm.navigateTo().toasterPage();
  expect(page.url()).toBe("http://localhost:4200/pages/modal-overlays/toastr");
  //smart table
  await pm.navigateTo().smartTablePage();
  expect(page.url()).toBe("http://localhost:4200/pages/tables/smart-table");
  // tooltip
  await pm.navigateTo().tooltipPage();
  expect(page.url()).toBe("http://localhost:4200/pages/modal-overlays/tooltip");
});

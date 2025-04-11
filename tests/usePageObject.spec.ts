import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";
import {argosScreenshot} from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("navigation to the form page @smoke", async ({ page }) => {
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


test.only('testing with argos ci', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await argosScreenshot(page, "form layouts page");
  await pm.navigateTo().datepickerPage();
  await argosScreenshot(page, "datepicker page");
});

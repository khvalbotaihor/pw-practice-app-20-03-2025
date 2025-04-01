import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Form Layouts", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await page.waitForTimeout(500);

  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentials(
      "email@email.com",
      "123456",
      "Option 1"
    );

  await page.waitForTimeout(500);
  await pm
    .onFormLayoutsPage()
    .submitBasicFormWithCredentials("rrr@33.com", "123", true);

  await page.reload();
  await pm
    .onFormLayoutsPage()
    .submitBasicFormWithCredentials("rrr@33.com", "123", false);
});

test("Datepicker", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().datepickerPage();
  await page.waitForTimeout(500);

  await pm.onDatePickerPage().selectCommonDatePickerFromToday(7);
});

test("Datepicker with range", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().datepickerPage();
  await page.waitForTimeout(500);

  await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(1, 100);
});

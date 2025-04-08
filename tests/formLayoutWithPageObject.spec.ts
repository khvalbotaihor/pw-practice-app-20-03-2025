import { test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Form Layouts", async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

  await pm.navigateTo().formLayoutsPage();
  await page.waitForTimeout(500);

  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentials(
      randomEmail,
      "123456",
      "Option 1"
    );

  await page.waitForTimeout(500);
  await pm
    .onFormLayoutsPage()
    .submitBasicFormWithCredentials(randomEmail, "123", true);

  await page.screenshot({ path: 'screenshots/form-layouts.png' });
    await page.locator("nb-card", {hasText: 'Inline form'}).screenshot({path: 'screenshots/inline-form.png'});
  const buffer = await page.screenshot();
  console.log(buffer.toString('base64'));



  await page.reload();
  await pm
    .onFormLayoutsPage()
    .submitBasicFormWithCredentials(randomEmail, "123", false);

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

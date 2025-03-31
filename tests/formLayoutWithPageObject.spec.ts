import { test } from "@playwright/test";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { NavigationPage } from "../page-objects/navigationPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Form Layouts", async ({ page }) => {
  const navigationTo = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);

  await navigationTo.formLayoutsPage();
  await page.waitForTimeout(500);

  await formLayoutsPage.submitUsingTheGridFormWithCredentials(
    "email@email.com",
    "123456",
    "Option 1"
  );

  await page.waitForTimeout(500);
  await formLayoutsPage.submitBasicFormWithCredentials(
    "rrr@33.com",
    "123",
    true
  );

  await page.reload();
  await formLayoutsPage.submitBasicFormWithCredentials(
    "rrr@33.com",
    "123",
    false
  );
});

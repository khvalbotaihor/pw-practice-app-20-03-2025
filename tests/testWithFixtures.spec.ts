import { test } from '../test-options';
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
// });

//test("parametrized methods", async ({ page, formLayoutsPage }) => {
  test("parametrized methods", async ({ pageManager }) => {

  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

  // await pm.navigateTo().formLayoutsPage();

  await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentials(randomEmail,"123456","Option 1");

  await pageManager.onFormLayoutsPage().submitBasicFormWithCredentials(randomEmail, "123", true);

});

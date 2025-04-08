import { test } from '../test-options2';
import { faker } from "@faker-js/faker";

test("Form Layouts", async ({pageManager}) => {
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

  await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentials(randomEmail,"123456","Option 1");
  await pageManager.onFormLayoutsPage().submitBasicFormWithCredentials(randomEmail, "123", true);


});



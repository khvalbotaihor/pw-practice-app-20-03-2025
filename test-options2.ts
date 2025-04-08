import { test as base } from "@playwright/test";
import { PageManager } from "../pw-practice-app-20-03-2025/page-objects/pageManager";

export type TestOptions = {
  globalQaURL: string;
  formLayoutsPage: string;
  pageManager: PageManager;
}

export const test = base.extend<TestOptions>({
  globalQaURL: ['', { option: true }],

  formLayoutsPage: async ({ page }, use) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    console.log('formLayoutsPage before use()');

    await use('');
    console.log('formLayoutsPage after use()');
  },


  pageManager: async ({ page, formLayoutsPage }, use) => {
    const pm = new PageManager(page);
    console.log('pageManager before use()');

    await use(pm);
    console.log('pageManager after use()');

  },
});

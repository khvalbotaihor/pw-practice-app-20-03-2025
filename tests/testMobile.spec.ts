import { test } from '../test-options';

  test("parametrized methods", async ({ page }, testInfo) => {
    await page.goto("/", { waitUntil: 'networkidle' });


    if (testInfo.project.name === 'mobile') {
      await page.locator('.sidebar-toggle').click();
    }

    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();

    if (testInfo.project.name === 'mobile') {
      await page.locator('.sidebar-toggle').click();
    }
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' });
    await usingTheGridEmailInput.fill('test 1')
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test 2')




});

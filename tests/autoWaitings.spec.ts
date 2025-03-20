import test, { expect } from "playwright/test";

test.beforeEach(async ({page}, testInfo) => {
  await page.goto('http://uitestingplayground.com/ajax');

  await page.getByRole('button', {name: 'Button Triggering AJAX Request'}).click();
  testInfo.setTimeout(testInfo.timeout + 2000);
});

test ("Auto-waitings", async ({page}) => {
const successElement  =  page.locator('.bg-success');
//const text = await successElement.textContent();
//await successElement.waitFor({state: 'attached'});
//const text = await successElement.allTextContents();

//expect(text).toContain('Data loaded with AJAX get request.');

// wait for element
//await page.waitForSelector('.bg-success');

// wait for particular response

//await page.waitForResponse('http://uitestingplayground.com/ajaxdata');
await page.waitForLoadState('networkidle');

await expect(successElement).toHaveText('Data loaded with AJAX get request.', {timeout: 20000});

  //const notificationMessage = await page.getByRole('status', { name: 'Data loaded with AJAX get request.' });
  //await expect(notificationMessage).toBeVisible();
});


test("timeouts", async ({page}) => {
 // test.setTimeout(10000);
  test.slow();
  const successElement  =  page.locator('.bg-success');
  await successElement.click();

});


import { test, expect } from '@playwright/test';


test.beforeEach(async ({page})=> {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test('Locator syntax rules',  async ({page})=> {

// by Tag name
page.locator('input')

// by id
page.locator('#inputEmail1')

// by class
page.locator('.shape-rectangle')

// by attribute
page.locator('[placeholder="Email"]')

// by class value (full)
page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

// combine different selectors
page.locator('input[placeholder="Email"][nbinput].shape-rectangle')

// by xpath (not recommended)
page.locator('//*[@id="inputEmail1"]')


// by partial text matching
page.locator(':text("Using")')

// by exact text matching
page.locator(':text-is("Using the Grid")')
});


test('User facing locators',  async ({page})=> {
  await page.getByRole('textbox', {name: 'Email'}).first().click()
  await page.getByRole('button', {name: 'Sign in'}).first().click()

  await page.getByLabel('Email').first().click();

  await page.getByPlaceholder('Jane Doe').click();

  await page.getByText('Using the grid').click();
  await page.getByTestId('SignIn').click();


  await page.getByTitle('IoT Dashboard').click();

});

test('Locating child elementsU',  async ({page})=> {
  await page.locator('nb-card nb-radio').getByText('Option 1').click();
  await page.locator('nb-card nb-radio :text-is("Option 2")').click();
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click();

  await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();

  await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('Locating parent elements',  async ({page})=> {
  await page.locator('nb-card', {hasText: 'Using the grid'}).getByRole('textbox', {name: 'Email'}).click()

  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).click();

  await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click()

  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: 'Email'}).click()

  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()

});


test('Reusing locators',  async ({page})=> {
const basicFrom = page.locator('nb-card').filter({hasText: 'Basic form'});
const emailField =basicFrom.getByRole('textbox', {name: 'Email'});
const email = 'email1@gmail.com';

  await emailField.fill(email);
  await basicFrom.getByRole('textbox', {name: 'Password'}).fill('password123');
  await basicFrom.locator('nb-checkbox').click();
  await basicFrom.getByRole('button').click();

  await expect(emailField).toHaveValue(email);


});


test('Extracting values',  async ({page})=> {
// single test value
const basicFrom = page.locator('nb-card').filter({hasText: 'Basic form'});
const buttonText = await basicFrom.locator('button').textContent();

expect(buttonText).toBe('Submit');


// all text values
const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
expect(allRadioButtonsLabels).toContain('Option 1');

expect(allRadioButtonsLabels).toStrictEqual(['Option 1', 'Option 2', 'Disabled Option']);

// input value
const emailField = basicFrom.getByRole('textbox', {name: 'Email'});
await emailField.fill('TEST@mail.com');
const emailFieldValue = await emailField.inputValue();
await expect(emailFieldValue).toBe('TEST@mail.com');


const placeHolder = await page.locator('[id="exampleInputEmail1"]').getAttribute('placeholder');
 expect(placeHolder).toEqual('Email');
});

test('assertions',  async ({page})=> {
  const basicFrom = page.locator('nb-card').filter({hasText: 'Basic form'});
const basicFormButton = basicFrom.getByRole('button');
const basicFormButtonValue = await basicFormButton.textContent();

// general assertions
const value = 5
expect(value).toBe(5);

expect(basicFormButtonValue).toEqual('Submit');


// locator assertion
await expect(basicFormButton).toHaveText('Submit');

});

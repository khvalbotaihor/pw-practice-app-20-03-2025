import { Page, Locator } from "@playwright/test";

export class FormLayoutsPage {
  readonly page: Page;
  readonly basicFormContainer: Locator;
  readonly basicFormEmailField: Locator;
  readonly basicFormPasswordField: Locator;
  readonly basicFormCheckMeOut: Locator;
  readonly basicFormSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basicFormContainer = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" });
    this.basicFormEmailField = this.basicFormContainer.getByRole("textbox", {
      name: "Email",
    });
    this.basicFormPasswordField = this.basicFormContainer.getByRole("textbox", {
      name: "Password",
    });
    this.basicFormCheckMeOut = this.basicFormContainer.locator("nb-checkbox");
    this.basicFormSubmitButton = this.basicFormContainer.getByRole("button");
  }

  async submitBasicFormWithCredentials(
    email: string,
    password: string,
    checkMeOut: boolean
  ) {
    await this.basicFormEmailField.fill(email);
    await this.basicFormPasswordField.fill(password);
    if (checkMeOut) {
      await this.basicFormCheckMeOut.click({ force: true });
    }
    await this.basicFormSubmitButton.click();
  }

  async submitUsingTheGridFormWithCredentials(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page
      .locator("nb-card")
      .filter({ hasText: "Using the Grid" });
    const emailField = usingTheGridForm.getByRole("textbox", { name: "Email" });
    const passwordField = usingTheGridForm.getByRole("textbox", {
      name: "Password",
    });
    const optionLocator = usingTheGridForm.getByRole("radio", {
      name: optionText,
    });
    const submitButton = usingTheGridForm.getByRole("button");

    await emailField.fill(email);
    await passwordField.fill(password);
    await optionLocator.check({ force: true });
    await submitButton.click();
  }
}

import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  // it was commented because we extebds HelperBase and we need to replace page with super(page)
  // readonly page: Page;
  readonly formLayoutsMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly tooltipMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly datepickerMenuItem: Locator;

  constructor(page: Page) {
    // it was commented because we extends HelperBase and we need to replace page with super(page)
    //this.page = page;
    super(page);
    this.formLayoutsMenuItem = page.getByText("Form Layouts");
    this.toastrMenuItem = page.getByText("Toastr");
    this.tooltipMenuItem = page.getByText("Tooltip");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.datepickerMenuItem = page.getByText("Datepicker");
  }

  async formLayoutsPage() {
    await this.isMenuExpanded("Forms");
    await this.formLayoutsMenuItem.click();
    await this.waitForNumberOfSeconds(1);
  }

  async toasterPage() {
    await this.isMenuExpanded("Modal & Overlays");
    await this.toastrMenuItem.click();
    await this.waitForNumberOfSeconds(1);
  }

  async tooltipPage() {
    await this.isMenuExpanded("Modal & Overlays");
    await this.tooltipMenuItem.click();
    await this.waitForNumberOfSeconds(1);
  }
  async smartTablePage() {
    await this.isMenuExpanded("Tables & Data");
    await this.smartTableMenuItem.click();
    await this.waitForNumberOfSeconds(1);
  }
  async datepickerPage() {
    await this.isMenuExpanded("Forms");
    await this.datepickerMenuItem.click();
    await this.waitForNumberOfSeconds(1);
  }

  private async isMenuExpanded(menuName: string) {
    const locator = this.page.getByTitle(menuName);
    const ariaExpanded = await locator.getAttribute("aria-expanded");
    if (ariaExpanded == "false") {
      await locator.click();
    }
  }
}

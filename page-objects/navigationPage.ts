import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly formLayoutsMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly tooltipMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly datepickerMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formLayoutsMenuItem = page.getByText("Form Layouts");
    this.toastrMenuItem = page.getByText("Toastr");
    this.tooltipMenuItem = page.getByText("Tooltip");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.datepickerMenuItem = page.getByText("Datepicker");
  }

  async formLayoutsPage() {
    await this.isMenuExpanded("Forms");
    await this.formLayoutsMenuItem.click();
  }

  async toasterPage() {
    await this.isMenuExpanded("Modal & Overlays");
    await this.toastrMenuItem.click();
  }

  async tooltipPage() {
    await this.isMenuExpanded("Modal & Overlays");
    await this.tooltipMenuItem.click();
  }
  async smartTablePage() {
    await this.isMenuExpanded("Tables & Data");
    await this.smartTableMenuItem.click();
  }
  async datepickerPage() {
    await this.isMenuExpanded("Forms");
    await this.datepickerMenuItem.click();
  }

  private async isMenuExpanded(menuName: string) {
    const locator = this.page.getByTitle(menuName);
    const ariaExpanded = await locator.getAttribute("aria-expanded");
    if (ariaExpanded == "false") {
      await locator.click();
    }
  }
}

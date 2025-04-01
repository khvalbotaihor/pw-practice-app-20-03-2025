import { Page, expect } from "@playwright/test";
import { HelperBase } from "../page-objects/helperBase";

export class DatePickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async selectCommonDatePickerFromToday(numberOfDaysFromToday: number) {
    const calendarInput = this.page.getByPlaceholder("Form Picker");
    await calendarInput.click();
    const formattedDate = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    );

    await expect(calendarInput).toHaveValue(formattedDate);
  }

  async selectDatePickerWithRangeFromToday(
    numberOfDaysFromToday: number,
    numberOfDaysToToday: number
  ) {
    const datePickerWithRange = this.page.getByPlaceholder("Range Picker");
    await datePickerWithRange.click();
    const formattedDate1 = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    );
    const formattedDate2 = await this.selectDateInTheCalendar(
      numberOfDaysToToday
    );
    const assertValue = `${formattedDate1} - ${formattedDate2}`;

    await expect(datePickerWithRange).toHaveValue(assertValue);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const day = date.getDate();
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const calendarMonthYearValue = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    let calendarMonthYearElement = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    while (!calendarMonthYearElement.includes(calendarMonthYearValue)) {
      console.log(
        `calendarMonthYearElement: ${calendarMonthYearElement} includes ${calendarMonthYearValue}`
      );
      await this.page.locator('[data-name="chevron-right"]').click();
      calendarMonthYearElement = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    const calendarDay = this.page
      .locator(".day-cell.ng-star-inserted:not(.bounding-month)")
      .getByText(day.toString(), { exact: true });
    await calendarDay.click();
    return formattedDate;
  }
}

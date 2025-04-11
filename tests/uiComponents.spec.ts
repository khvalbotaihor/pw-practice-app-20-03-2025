import test, { expect } from "playwright/test";
import { filter } from "rxjs-compat/operator/filter";

// test.describe.configure({ mode: "parallel" });



test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("UI Components", async () => {
  test.describe.configure({retries: 2});
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }, testInfo) => {
    if (testInfo.retry) {
      //to do smt
    }
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill(process.env.USERNAME);
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test2@test.com", {
      delay: 500,
    });

    // generic assertion

    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
  });

  test("radio buttons", async ({ page }) => {
    const usingTheGridFrom = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridFrom.getByLabel("Option 1").check({ force: true });
    await usingTheGridFrom
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    const radioStatus = await usingTheGridFrom
      .getByRole("radio", { name: "Option 2" })
      .isChecked();
    expect(radioStatus).toBeTruthy();
    expect(
      await usingTheGridFrom
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();
  });

    test.only("radio buttons 2", async ({ page }) => {
    const usingTheGridFrom = page.locator("nb-card", {hasText: "Using the Grid"});

    await usingTheGridFrom.getByLabel("Option 2").check({ force: true });

    const radioStatus = await usingTheGridFrom.getByRole("radio", { name: "Option 1" }).isChecked();
      //expect(radioStatus).toBeTruthy();
    await expect(usingTheGridFrom).toHaveScreenshot({maxDiffPixels: 150});


  });
});

test("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .click({ force: true });
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });
  await page
    .getByRole("checkbox", { name: "Show toast with icon" })
    .uncheck({ force: true });

  const allBoxes = await page.getByRole("checkbox");
  for (const checkbox of await allBoxes.all()) {
    await checkbox.uncheck({ force: true });
    expect(await checkbox.isChecked()).toBeFalsy();
  }
});

test("list and drop-down", async ({ page }) => {
  const buttonThemeButton = page.locator("ngx-header nb-select");

  const defaultTheme = page.locator('[ng-reflect-value="default"]');
  const darkTheme = page.locator('[ng-reflect-value="dark"]');
  const optionList = page.locator("nb-option-list nb-option");

  await buttonThemeButton.click();
  await darkTheme.click();
  expect(await buttonThemeButton).toHaveText("Dark");
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(34, 43, 69)");

  await buttonThemeButton.click();

  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  await optionList.filter({ hasText: "Cosmic" }).click();

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  for (const color in colors) {
    await buttonThemeButton.click();
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
  }
});

test("tooltip", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipPlacements = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });
  await tooltipPlacements.getByRole("button", { name: "Top" }).hover();

  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
});

test("dialog boxes", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart table").click();

  // handle browser dialog
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    await dialog.accept();
  });

  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();

  expect(await page.getByRole("table").locator("tr").allTextContents()).toEqual(
    expect.not.arrayContaining(["mdo@gmail.com"])
  );

  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});

test("table", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart table").click();

  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click();

  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("99");
  await page.locator(".nb-checkmark").click();
  await expect(targetRow).toContainText("99");

  //navigate to second tab
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.locator(".nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("99");
  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("email@gmail.com");

  await page.locator(".nb-checkmark").click();

  await expect(targetRowById).toContainText("99");
  await expect(targetRowById).toContainText("email@gmail.com");

  await expect(targetRowById.locator("td").nth(5)).toHaveText(
    "email@gmail.com"
  );
  await expect(targetRowById.locator("td").nth(6)).toHaveText("99");

  // test filter of teh table
  const ages = ["20", "30", "40", "200"];

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500);
    if (age == "200") {
      await expect(await page.locator("tbody tr").count()).toBe(1);
      await expect(await page.locator("tbody tr")).toContainText(
        "No data found"
      );
    } else {
      await expect(await page.locator("tbody tr td").count()).toBeGreaterThan(
        1
      );
    }

    const rows = page.locator("tbody tr");
    for (let row of await rows.all()) {
      const cellValue = await row.locator("td").last().textContent();
      if (age == "200") {
        await expect(cellValue).toContain("No data found");
      } else {
        await expect(cellValue).toEqual(age);
      }
    }
  }
});

test("date picker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const commonDatepickerContainer = page.locator("nb-card", {
    hasText: "Common Datepicker",
  });
  const datepickerWithRange = page.locator("nb-card", {
    hasText: "Datepicker With Range",
  });
  const datepickerWithDisabledMixMaxValues = page.locator("nb-card", {
    hasText: "Datepicker With Min Max Values",
  });
  const today = new Date();
  const day = today.getDate();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);

  await commonDatepickerContainer.locator("input").click();
  await page
    .locator("nb-calendar-day-picker nb-calendar-day-cell:not(.bounding-month)")
    .getByText(day.toString(), { exact: true })
    .click();

  await expect(commonDatepickerContainer.locator("input")).toHaveValue(
    formattedDate
  );

  //
  async function selectFutureDay(page, daysToAdd = 100) {
    // 1. Calculate the future date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysToAdd);
    const formattedDateReturn = targetDate.toLocaleDateString("en-US", options);

    const targetDay = targetDate.getDate();
    const targetMonth = targetDate.getMonth(); // 0-based (0 = January)
    const targetYear = targetDate.getFullYear();

    console.log(`Selecting date: ${targetDate.toDateString()}`);

    // 2. Open the calendar (assumes it's already open; open it if needed)

    // 3. Loop until the displayed month matches the target month and year
    while (true) {
      // Get the current displayed month and year
      const calendarHeader = await page
        .locator("nb-calendar-view-mode")
        .textContent();

      // Example format might be: "March 2025"
      const [displayedMonthName, displayedYear] = calendarHeader
        .trim()
        .split(" ");

      // Convert displayed month name to month index
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const displayedMonth = months.indexOf(displayedMonthName);

      // Compare current displayed month/year with target
      if (
        displayedMonth === targetMonth &&
        parseInt(displayedYear) === targetYear
      ) {
        break; // Stop clicking next when we are on the target month/year
      }

      // Click the next month button to navigate forward
      await page.locator('[data-name="chevron-right"]').click();

      // Optional: wait a short time for calendar to update
      await page.waitForTimeout(300);
    }

    // 4. Select the target day, excluding days from bounding-month
    await page
      .locator(
        `nb-calendar-day-picker nb-calendar-day-cell:not(.bounding-month) .cell-content`,
        {
          hasText: new RegExp(`^\\s*${targetDay}\\s*$`),
        }
      )
      .filter({ hasText: targetDay.toString() })
      .click();

    console.log(`Date selected: ${targetDate.toDateString()}`);
    return formattedDateReturn;
  }

  await commonDatepickerContainer.locator("input").click();
  const returnDate = await selectFutureDay(page, 100);
  await expect(commonDatepickerContainer.locator("input")).toHaveValue(
    returnDate
  );
});

test("date picker2", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInput = page.getByPlaceholder("Form Picker");
  const calendarInputWithRange = page.getByPlaceholder("Range Picker");

  async function selectDate(additionalDay) {
    let date = new Date();
    date.setDate(date.getDate() + additionalDay);
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
    let calendarMonthYearElement = await page
      .locator("nb-calendar-view-mode")
      .textContent();

    while (!calendarMonthYearElement.includes(calendarMonthYearValue)) {
      console.log(
        `calendarMonthYearElement: ${calendarMonthYearElement} includes ${calendarMonthYearValue}`
      );
      await page.locator('[data-name="chevron-right"]').click();
      calendarMonthYearElement = await page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    const calendarDay = page
      .locator(".day-cell.ng-star-inserted:not(.bounding-month)")
      .getByText(day.toString(), { exact: true });
    await calendarDay.click();
    return formattedDate;
  }

  await calendarInput.click();

  const formattedDate = await selectDate(20);

  await expect(calendarInput).toHaveValue(formattedDate);
  // second date compare

  await calendarInput.click();

  const formattedDate2 = await selectDate(30);

  await expect(calendarInput).toHaveValue(formattedDate2);

  // datepicker with range

  const datePickerWithRange = page.getByPlaceholder("Range Picker");
  await datePickerWithRange.click();
  const formattedDate3 = await selectDate(40);
  const formattedDate4 = await selectDate(90);
  await expect(datePickerWithRange).toHaveValue(
    `${formattedDate3} - ${formattedDate4}`
  );
});

test("slider", async ({ page }) => {
  // update attribute value
  const tab = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  );
  await tab.evaluate((node) => {
    node.setAttribute("cx", "232.63098833543773");
    node.setAttribute("cy", "232.6309883354377");
  });
  await tab.click();
  const temperatureValue = await page
    .locator('[class="value temperature h1"]')
    .textContent();
  await expect(temperatureValue.trim()).toEqual("30");

  // mouse movements
  const tab2 = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
  await tab2.scrollIntoViewIfNeeded();

  const box = await tab2.boundingBox();

  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();

  await page.mouse.move(x + 100, y);
  await expect(tab2).toContainText("26");
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();
  await expect(tab2).toContainText("30");
});

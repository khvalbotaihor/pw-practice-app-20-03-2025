import test, { expect } from "playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("UI Components", async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@test.com");
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

test.only("table", async ({ page }) => {
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

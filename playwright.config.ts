import { defineConfig, devices } from "@playwright/test";
import { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  expect: {
    toMatchSnapshot: { maxDiffPixels: 50 },
  },
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['allure-playwright'],
    ['html'],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        //token: "<argos_e445e1ada809fc83389620e0f98602c691>",// - token is not needed as we logged into the app through github
      },
    ],
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',
    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    autoWaitingWebsite: 'http://uitestingplayground.com/ajax',

     // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // Capture screenshot after each test failure.
    screenshot: "only-on-failure",
    video: {
      mode: "on",
      size: {
        width: 1280,
        height: 720,
      },
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
      }
    },
      {
      name: 'staging',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201/',
      }
  },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: { ...devices['iPhone 13 Pro'] },
    },
  ],

   webServer: {
    command: 'npm run start',
     url: 'http://localhost:4200/',
       timeout: 120000, // wait up to 2 minutes
   },
});

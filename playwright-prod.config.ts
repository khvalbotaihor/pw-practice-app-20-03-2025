import { defineConfig, devices } from "@playwright/test";
import { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  use: {
    baseURL: 'http://localhost:4200/',
    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    autoWaitingWebsite: 'http://uitestingplayground.com/ajax',
  },

  projects: [
    {
      name: 'chromium',
    }
  ]
});

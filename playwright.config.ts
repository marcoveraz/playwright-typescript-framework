import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,

  use: {
    headless: process.env.CI ? true : false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    // Use only for local debugging (records all tests).
    // Avoid in CI due to performance and storage impact.
    // video: 'on',
    viewport: null, //Max size window: Do not force a fixed viewport; use the browser window size instead
    launchOptions: {
      //Max size window
      args: ['--start-maximized'],
      slowMo: 800, // in milliseconds; slows down each action to better visualize interactions (useful for debugging, but increases test execution time)
    },
  },

  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results.xml' }],
    ['list'],
    ['allure-playwright'],
  ],
});

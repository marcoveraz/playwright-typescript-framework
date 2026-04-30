import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    //video: 'retain-on-failure',
    video: 'on',
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
  ],
});

import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Maximium time a test can run for */
  timeout: 50*1000,
  expect: {
    timeout: 40*1000
  },
  use:{
    browserName: 'chromium',
    headless: false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    trace: 'on' //retain-on-failure, on ,off
  },

  
  reporter: 'html'
  
});

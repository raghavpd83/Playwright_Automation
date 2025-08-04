// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1,
  timeout: 40000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [{
    name: 'Firefox',
    use: {
      browserName: 'firefox',
      headless: true,
      screenshot: 'on',
      trace: 'retain-on-failure',
      //viewport: {width:720, height:720}
      
    }
  },
  {
    name: 'Chrome',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'only-on-failure',
      //video:'retain-on-failure',
      trace: 'retain-on-failure',
      //...devices['iPhone 15 Pro Max']
    }
  }
  
  ]



});
module.exports = config


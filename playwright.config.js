// @ts-check
const { devices } = require('@playwright/test');


const config = {
  testDir: './tests',
  //retries : 1,
  /* Maximum time one test can run for. */
  timeout: 40 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName : "chromium",
        headless : false,
        screeshot : 'only-on-failure',
        trace : 'retain-on-failure', //'on', 'off'
        //video: 'on-first-retry',
      },
    },
    {
      name: 'firefox',
      use: {
        browserName : "firefox",
        headless : false,
        screeshot : 'only-on-failure',
        trace : 'retain-on-failure', //'on', 'off'
        //video: 'on-first-retry',
      },
    },
    {
      name: 'webkit',
      use: {
        browserName : "webkit",
        headless : true,
        screeshot : 'only-on-failure',
        trace : 'retain-on-failure', //'on', 'off'
        //video: 'on-first-retry',
      },
    },
  ],
  

};

module.exports = config;

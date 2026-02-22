import { defineConfig } from '@playwright/test';
import { config } from 'node:process';

export default defineConfig({
  testDir: './tests',
  timeout: 50 * 1000,
  expect:{

    timeout:5000
  },
  reporter: 'html',

      use: {
        browserName: 'chromium',
        headless:false,
        screenshot: 'on',
        //video: 'retain-on-failure',
        trace: 'retain-on-failure',//'on','off'
      }
      });
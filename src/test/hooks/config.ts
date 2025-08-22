// src/support/config.ts
import { chromium, firefox, webkit, Browser, BrowserContext, BrowserType, Page } from '@playwright/test';
import * as fs from "fs";

// load settings.json
const jsondata = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));

let browser: Browser;
let context: BrowserContext;
let page: Page;

type BrowserNames = 'chromium' | 'firefox' | 'webkit';
const browsers: Record<BrowserNames, BrowserType> = { chromium, firefox, webkit };

class Config {
  async openBrowser() {
    const browserName = jsondata.browser.name.toLowerCase() as BrowserNames;
    const launchBrowser = browsers[browserName];
    if (!launchBrowser) throw new Error(`Unsupported browser: ${browserName}`);

    browser = await launchBrowser.launch({
      headless: jsondata.browser.headless,
      args: jsondata.browser.args
    });

    context = await browser.newContext({ viewport: null });
    page = await context.newPage();
  }

  async getUrl() {
    console.log("Navigating to:", jsondata.app.url); // ✅ debug log
    await page.goto(jsondata.app.url);               // ✅ uses your JSON URL
  }

  async closeBrowser() {
    await browser.close(); //close the blowser
  }

  getPage(): Page {
    return page;
  }
}

const config = new Config(); //create instance of the class
export { config }; //export the class 

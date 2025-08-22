import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { config } from './config';

setDefaultTimeout(60 * 1000);

Before(async function () {
  await config.openBrowser();
});

After(async function () {
  await config.closeBrowser();
});

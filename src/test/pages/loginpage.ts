import { Page, expect } from '@playwright/test';

export class loginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.page.locator('#userName')).toBeVisible();
  }

  async enterUserNameAndPassword(username: string, password : string) {
    await this.page.getByRole('textbox', { name: 'UserName' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async isUserLoggedInAs(username: string) {
    const userText = await this.page.getByText(username);
    await expect(userText).toBeVisible();
  }
}
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly linkToFormAuthentication: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alertError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkToFormAuthentication = page.locator('text=Form Authentication');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button');
    this.alertError = page.locator(
      '#flash:has-text("Your username is invalid!")'
    );
  }

  public async goTo() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.linkToFormAuthentication.click();
    expect(this.page.url()).toContain('/login');
  }

  public async validateLoginError() {
    await this.fillLoginData('user', 'password');
    await this.alertError.waitFor({ state: 'visible' });
    expect(this.alertError).toBeVisible();
  }

  private async fillLoginData(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

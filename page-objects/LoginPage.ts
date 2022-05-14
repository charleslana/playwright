import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly linkToFormAuthentication: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly alert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkToFormAuthentication = page.locator('text=Form Authentication');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button');
    this.alert = page.locator('#flash');
  }

  public async goTo() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.linkToFormAuthentication.click();
    expect(this.page.url()).toContain('/login');
  }

  public async validateLoginError() {
    await this.fillLoginData('user', 'password');
    await expect(this.alert).toHaveClass('flash error');
  }

  public async validateLoginSuccess() {
    await this.fillLoginData('tomsmith', 'SuperSecretPassword!');
    await expect(this.page).toHaveURL(
      'https://the-internet.herokuapp.com/secure'
    );
  }

  private async fillLoginData(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

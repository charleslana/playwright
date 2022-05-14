import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';

test.skip('Should be able navigate login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goTo();
});

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
  });

  test.skip('Should be able navigate login page', async ({ page }) => {
    page.url();
  });

  test('Should not be able to login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validateLoginError();
  });

  test('Should be able to login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.validateLoginSuccess();
  });
});

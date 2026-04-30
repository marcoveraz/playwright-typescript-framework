import { expect, test } from '@playwright/test';
import { global } from '../../config/saucedemo/globals';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { currentEnv } from '../../config/saucedemo/env';

test.describe('SauceDemo Login', () => {
  test('should log in successfully with valid credentials', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // GIVEN the user navigates to the SauceDemo login page
    await loginPage.goto(currentEnv.baseURL);

    // WHEN the user enters valid credentials and attempts to log in
    await loginPage.login(currentEnv.username, currentEnv.password);

    // THEN the user should be redirected to the inventory page
    await expect(page).toHaveURL(global.inventoryRegex);
  });

  test('should show an error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // GIVEN the user navigates to the login page with invalid credentials
    await loginPage.loginPageFlow(
      currentEnv.baseURL,
      currentEnv.username + '.',
      currentEnv.password,
    );

    // WHEN the user attempts to log in with incorrect credentials

    // THEN an error message should be displayed
    await expect(loginPage.errorMessage).toBeVisible();

    // AND the error message should indicate invalid username or password
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match',
    );
  });
});

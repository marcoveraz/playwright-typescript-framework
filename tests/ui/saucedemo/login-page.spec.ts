import { test, expect } from '../../../src/fixtures/saucedemo/pages.fixture';
import { global } from '../../../src/config/saucedemo/globals';
import { currentEnv } from '../../../src/config/saucedemo/env';

test.describe('SauceDemo Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(currentEnv.baseURL);
  });

  test('should redirect to inventory page when logging in with valid credentials', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(currentEnv.username, currentEnv.password);

    await expect(page).toHaveURL(global.inventoryRegex);
  });

  test('should display error message when logging in with invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.login(`${currentEnv.username}.`, currentEnv.password);

    await expect(loginPage.errorMessage).toBeVisible();

    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match',
    );
  });
});

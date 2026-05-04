import { test as base } from './base.fixture';

import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { HeaderMenuPage } from '../../pages/saucedemo/HeaderMenuPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { ShoppingCartPage } from '../../pages/saucedemo/ShoppingCartPage';
import { CheckoutYourInformationPage } from '../../pages/saucedemo/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../../pages/saucedemo/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/saucedemo/CheckoutCompletePage';

type Pages = {
  loginPage: LoginPage;
  headerMenuPage: HeaderMenuPage;
  inventoryPage: InventoryPage;
  shoppingCartPage: ShoppingCartPage;
  checkoutYourInformationPage: CheckoutYourInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  headerMenuPage: async ({ page }, use) => {
    await use(new HeaderMenuPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },

  checkoutYourInformationPage: async ({ page }, use) => {
    await use(new CheckoutYourInformationPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});

export const expect = test.expect;

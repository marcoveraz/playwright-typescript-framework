import { expect, test } from '@playwright/test';
import { currentEnv } from '../../config/saucedemo/env';
import { global } from '../../config/saucedemo/globals';
import { LoginPage } from '../../pages/saucedemo/LoginPage';
import { HeaderMenuPage } from '../../pages/saucedemo/HeaderMenuPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { ShoppingCartPage } from '../../pages/saucedemo/ShoppingCartPage';
import { CheckoutYourInformationPage } from '../../pages/saucedemo/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../../pages/saucedemo/CheckoutOverviewPage';
import { WaitUtils } from '../../utils/WaitUtils';
import { Utils } from '../../utils/Utils';
import { ProductUtils } from '../../utils/ProductUtils';
import { CheckoutCompletePage } from '../../pages/saucedemo/CheckoutCompletePage';

test.describe('Checkout flow', () => {
  test('should allow user to complete a purchase successfully', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const headerMenuPage = new HeaderMenuPage(page);
    const inventoryPage = new InventoryPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const checkoutYourInformationPage = new CheckoutYourInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const waitUtils = new WaitUtils();
    const utils = new Utils();
    const productUtils = new ProductUtils();

    // GIVEN the user navigates to the application and logs in with valid credentials
    await loginPage.loginPageFlow(
      currentEnv.baseURL,
      currentEnv.username,
      currentEnv.password,
    );

    // AND the inventory page is fully loaded
    await waitUtils.waitForPageReady(
      page,
      global.inventoryRegex,
      headerMenuPage.menuIcon,
    );

    // WHEN the user navigates through the header menu to "All Items"
    await headerMenuPage.clickOnMenuIcon();
    await headerMenuPage.clickOnMenuAllItems();
    await headerMenuPage.clickOnCloseMenu();

    // THEN the menu should be closed
    await expect(headerMenuPage.menuCloseButton).not.toBeVisible();

    // GIVEN there are products available in the inventory
    const totalAvailableProducts =
      await inventoryPage.getTotalAvailableProducts();

    // WHEN the user selects a random number of products
    const getRandomProductNumber = utils.getRandomNumber(
      totalAvailableProducts,
    );

    //Fixed DOM example: Just product buttons
    /*await inventoryPage.clickOnRandomAvailableProductsFixed(
      getRandomProductNumber,
    );*/

    //Dynamic DOM example: Just product buttons
    /*await inventoryPage.clickOnRandomAvailableProductsDynamic(
      getRandomProductNumber,
    );*/

    //Dynamic DOM with product name example

    console.log('Total available products found: ' + totalAvailableProducts);

    const selectedProducts =
      await inventoryPage.selectRandomProductsAndReturnDetails(
        getRandomProductNumber,
      );

    // THEN the shopping cart badge should reflect the number of selected products
    expect(await headerMenuPage.getShoppingCartTotal()).toBe(
      String(getRandomProductNumber),
    );

    // WHEN the user navigates to the shopping cart
    await headerMenuPage.clickOnShoppingCart();

    // THEN the shopping cart should contain the selected products
    console.log('Products in the shopping cart sorted...');
    await shoppingCartPage.sortProductosByName(
      await shoppingCartPage.getShoppingCartItems(),
    );

    expect(await shoppingCartPage.shoppingCartAreEqual(selectedProducts)).toBe(
      true,
    );

    // WHEN the user proceeds to checkout
    await shoppingCartPage.clickOnCheckoutButton();

    // AND enters the required checkout information
    await checkoutYourInformationPage.setFirstName(
      currentEnv.testUserFirstName,
    );
    await checkoutYourInformationPage.setLastName(currentEnv.testUserLastName);
    await checkoutYourInformationPage.setPostalCode(currentEnv.testPostalCode);
    await checkoutYourInformationPage.clickOnContinueButton();

    // THEN the checkout overview should display correct products and totals
    expect(
      await checkoutOverviewPage.checkoutOverviewProductsAreEqual(
        selectedProducts,
      ),
    ).toBe(true);

    expect(
      utils.extractNumber(await checkoutOverviewPage.getSubTotalValue()),
    ).toBe(productUtils.getTotalPrice(selectedProducts));

    // WHEN the user completes the purchase
    await checkoutOverviewPage.clickOnFinishButton();

    // THEN the order confirmation message should be displayed
    expect(await checkoutCompletePage.getThankyouOrderText()).toBe(
      checkoutCompletePage.thankyouOrderText,
    );

    // WHEN the user returns to home and logs out
    await checkoutCompletePage.clickOnBackHomeButton();
    await headerMenuPage.clickOnMenuIcon();
    await headerMenuPage.clickOnLogOut();

    // THEN the login page should be visible again
    expect(await loginPage.isLoginButtonPresent()).toBe(true);
  });
});

import { test, expect } from '../../fixtures/saucedemo/auth.fixture';
import { currentEnv } from '../../config/saucedemo/env';
import { global } from '../../config/saucedemo/globals';
import { WaitUtils } from '../../utils/WaitUtils';
import { Utils } from '../../utils/Utils';
import { ProductUtils } from '../../utils/ProductUtils';

test.describe('Checkout flow', () => {
  test('should complete a purchase successfully', async ({
    page,
    loggedInUser,
    headerMenuPage,
    inventoryPage,
    shoppingCartPage,
    checkoutYourInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    loginPage,
  }) => {
    const waitUtils = new WaitUtils();
    const utils = new Utils();
    const productUtils = new ProductUtils();

    await waitUtils.waitForPageReady(
      page,
      global.inventoryRegex,
      headerMenuPage.menuIcon,
    );

    await headerMenuPage.clickOnMenuIcon();
    await headerMenuPage.clickOnMenuAllItems();
    await headerMenuPage.clickOnCloseMenu();

    await expect(headerMenuPage.menuCloseButton).not.toBeVisible();

    const totalAvailableProducts =
      await inventoryPage.getTotalAvailableProducts();

    const randomProductCount = utils.getRandomNumber(totalAvailableProducts);

    const selectedProducts =
      await inventoryPage.selectRandomProductsAndReturnDetails(
        randomProductCount,
      );

    await expect
      .poll(() => headerMenuPage.getShoppingCartTotal())
      .toBe(String(randomProductCount));

    await headerMenuPage.clickOnShoppingCart();

    await shoppingCartPage.sortProductosByName(
      await shoppingCartPage.getShoppingCartItems(),
    );

    expect(await shoppingCartPage.shoppingCartAreEqual(selectedProducts)).toBe(
      true,
    );

    await shoppingCartPage.clickOnCheckoutButton();

    await checkoutYourInformationPage.setFirstName(
      currentEnv.testUserFirstName,
    );
    await checkoutYourInformationPage.setLastName(currentEnv.testUserLastName);
    await checkoutYourInformationPage.setPostalCode(currentEnv.testPostalCode);
    await checkoutYourInformationPage.clickOnContinueButton();

    expect(
      await checkoutOverviewPage.checkoutOverviewProductsAreEqual(
        selectedProducts,
      ),
    ).toBe(true);

    expect(
      utils.extractNumber(await checkoutOverviewPage.getSubTotalValue()),
    ).toBe(productUtils.getTotalPrice(selectedProducts));

    await checkoutOverviewPage.clickOnFinishButton();

    expect(await checkoutCompletePage.getThankyouOrderText()).toBe(
      checkoutCompletePage.thankyouOrderText,
    );

    await checkoutCompletePage.clickOnBackHomeButton();
    await headerMenuPage.clickOnMenuIcon();
    await headerMenuPage.clickOnLogOut();

    expect(await loginPage.isLoginButtonPresent()).toBe(true);
  });
});

import { Locator, Page } from '@playwright/test';

export class HeaderMenuPage {
  readonly menuIcon: Locator;
  readonly menuAllItems: Locator;
  readonly logOutLink: Locator;
  readonly menuCloseButton: Locator;
  readonly shoppingCartIcon: Locator;
  readonly shoppingCartIconTotal: Locator;

  constructor(page: Page) {
    this.menuIcon = page.locator('#react-burger-menu-btn');
    this.menuAllItems = page.locator('#inventory_sidebar_link');
    this.logOutLink = page.locator('a[data-test="logout-sidebar-link"]');
    this.menuCloseButton = page.locator('#react-burger-cross-btn');
    this.shoppingCartIcon = page.locator('#shopping_cart_container');
    this.shoppingCartIconTotal = page.locator(
      '#shopping_cart_container [data-test="shopping-cart-badge"]',
    );
  }

  async clickOnMenuIcon(): Promise<void> {
    await this.menuIcon.click();
  }

  async clickOnMenuAllItems(): Promise<void> {
    await this.menuAllItems.click();
  }

  async clickOnLogOut(): Promise<void> {
    await this.logOutLink.click();
  }

  async clickOnCloseMenu(): Promise<void> {
    await this.menuCloseButton.click();
  }

  async isMenuVisible(): Promise<boolean> {
    return await this.menuIcon.isVisible();
  }

  async clickOnShoppingCart(): Promise<void> {
    await this.shoppingCartIcon.click();
  }

  async getShoppingCartTotal(): Promise<string> {
    return this.shoppingCartIconTotal.innerText();
  }
}

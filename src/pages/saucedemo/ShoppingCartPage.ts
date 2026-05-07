import { Locator, Page } from '@playwright/test';
import { ShopingCartProducts } from '../../models/saucedemo/shopping-cart/ShopingCartProducts';
import { ProductAndPrice } from '../../models/saucedemo/inventory/Products';

export class ShoppingCartPage {
  readonly productRemoveButton: string;
  readonly productTextLabel: Locator;
  readonly productPriceLabel: Locator;
  readonly productInventoryItem: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.productRemoveButton = 'button[data-test^="remove-"]';
    this.productTextLabel = page.locator(
      'div[data-test="inventory-item-name"]',
    );
    this.productPriceLabel = page.locator(
      'div[data-test="inventory-item-price"]',
    );
    this.productInventoryItem = page.locator('div[data-test="inventory-item"]');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  async clickOnCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }

  async clickOnContinueShoppingButton(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getShoppingCartItems(): Promise<ShopingCartProducts[]> {
    const totalItems = await this.productInventoryItem.count();
    const products: ShopingCartProducts[] = [];
    for (let i = 0; i < totalItems; i++) {
      const product = this.productInventoryItem.nth(i);
      products.push({
        name: await product.locator(this.productTextLabel).innerText(),
        removeButton: await product.locator(this.productRemoveButton),
        price: await product.locator(this.productPriceLabel).innerText(),
      });
    }
    return products;
  }

  async sortProductosByName(products: ShopingCartProducts[]): Promise<void> {
    const sortedProducts = [...products].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    );
    for (const product of sortedProducts) {
      console.log(product.name + ' ' + product.price);
    }
  }

  async shoppingCartAreEqual(products: ProductAndPrice[]): Promise<boolean> {
    const cart = await this.getShoppingCartItems();

    if (products.length !== cart.length) return false;

    return products.every((sel) =>
      cart.some((c) => c.name === sel.name && c.price === sel.price),
    );
  }
}

import { Locator, Page } from '@playwright/test';
import { CheckoutOverviewProducts } from '../../models/saucedemo/checkout-overview/CheckoutOverviewProducts';
import { ProductAndPrice } from '../../models/saucedemo/inventory/Products';

export class CheckoutOverviewPage {
  readonly productTextLabel: Locator;
  readonly productPriceLabel: Locator;
  readonly productInventoryItem: Locator;
  readonly finishButton: Locator;
  readonly subtotalLabel: Locator;

  constructor(page: Page) {
    this.productTextLabel = page.locator(
      'div[data-test="inventory-item-name"]',
    );
    this.productPriceLabel = page.locator(
      'div[data-test="inventory-item-price"]',
    );
    this.productInventoryItem = page.locator('div[data-test="inventory-item"]');
    this.finishButton = page.locator('#finish');
    this.subtotalLabel = page.locator('div[data-test="subtotal-label"]');
  }

  async clickOnFinishButton(): Promise<void> {
    await this.finishButton.click();
  }

  async getCheckoutOverviewItems(): Promise<CheckoutOverviewProducts[]> {
    const totalItems = await this.productInventoryItem.count();
    const products: CheckoutOverviewProducts[] = [];
    for (let i = 0; i < totalItems; i++) {
      const product = this.productInventoryItem.nth(i);
      products.push({
        name: await product.locator(this.productTextLabel).innerText(),
        price: await product.locator(this.productPriceLabel).innerText(),
      });
    }
    return products;
  }

  async checkoutOverviewProductsAreEqual(
    products: ProductAndPrice[],
  ): Promise<boolean> {
    const cart = await this.getCheckoutOverviewItems();

    if (products.length !== cart.length) return false;

    return products.every((sel) =>
      cart.some((c) => c.name === sel.name && c.price === sel.price),
    );
  }

  async getSubTotalValue(): Promise<string> {
    return this.subtotalLabel.innerText();
  }
}

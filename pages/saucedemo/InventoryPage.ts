import { Locator, Page } from '@playwright/test';
import type { ElementHandle } from 'playwright';
import {
  ProductAndPrice,
  Product,
} from '../../models/saucedemo/inventory/Products';
import { Utils } from '../../utils/Utils';

export class InventoryPage {
  readonly page: Page;

  readonly pageInventoryElements: Locator;
  readonly availableProductButton: Locator;
  readonly availableProductButtonId: string;
  readonly unavailableProducButtonId: string;
  readonly iventoryNameClass: string;
  readonly inventoryItemDataTest: string;

  constructor(page: Page) {
    this.page = page;
    this.availableProductButtonId = 'button[id^="add-to-cart"]';
    this.unavailableProducButtonId = 'remove-sauce-labs-onesie';
    this.inventoryItemDataTest = 'div[data-test="inventory-item-price"]';
    this.iventoryNameClass = '.inventory_item_name';
    this.pageInventoryElements = page.locator('.inventory_item');
    this.availableProductButton = page.locator(this.availableProductButtonId);
  }

  async getTotalAvailableProducts(): Promise<number> {
    return (await this.getAvailableProductButtonsFixed()).length;
  }

  async getAvailableProductButtonsDynamic(): Promise<Locator[]> {
    const totalProducts = await this.pageInventoryElements.count();
    const availableProducts: Locator[] = [];
    for (let i = 0; i < totalProducts; i++) {
      const item = this.pageInventoryElements.nth(i);
      const addButton = item.locator(this.availableProductButtonId);
      if ((await addButton.count()) > 0) {
        availableProducts.push(item);
      }
    }
    return availableProducts;
  }

  async getAvailableProducts(): Promise<Product[]> {
    const totalProducts = await this.pageInventoryElements.count();
    const availableProducts: Product[] = [];
    for (let i = 0; i < totalProducts; i++) {
      const item = this.pageInventoryElements.nth(i);
      const addButton = item.locator(this.availableProductButtonId);
      const addPrice = await item
        .locator(this.inventoryItemDataTest)
        .innerText();
      if ((await addButton.count()) > 0) {
        const name = await item.locator(this.iventoryNameClass).innerText();
        availableProducts.push({
          name,
          button: addButton,
          price: addPrice,
        });
      }
    }
    return availableProducts;
  }

  async getAvailableProductButtonsFixed(): Promise<ElementHandle[]> {
    return await this.page.$$(this.availableProductButtonId);
  }

  async selectRandomProductsAndReturnDetails(
    totalSelect: number,
  ): Promise<ProductAndPrice[]> {
    if (totalSelect <= 0) return [];

    const availableProducts = await this.getAvailableProducts();

    if (availableProducts.length === 0) return [];

    const selectedProducts: ProductAndPrice[] = [];
    const utils = new Utils();
    const randomUniqueNumbers = utils.getUniqueRandomNumbers(
      availableProducts.length,
      totalSelect,
    );

    console.log('Random items to select: ' + totalSelect);
    for (const index of randomUniqueNumbers) {
      const item = availableProducts[index];
      selectedProducts.push({
        name: item.name,
        price: item.price,
      });
      await item.button.click();
      console.log('Selected item: ' + item.name + ' price: ' + item.price);
    }
    return selectedProducts;
  }

  async clickOnRandomAvailableProductsDynamic(
    totalSelect: number,
  ): Promise<void> {
    if (totalSelect <= 0) return;

    const availableProducts = await this.getAvailableProductButtonsDynamic();

    if (availableProducts.length === 0) return;

    const utils = new Utils();
    const randomUniqueNumbers = utils.getUniqueRandomNumbers(
      availableProducts.length,
      totalSelect,
    );

    console.log('Random items to select: ' + totalSelect);
    for (const index of randomUniqueNumbers) {
      const item = availableProducts[index];
      await item.locator(this.availableProductButtonId).click();
    }
  }

  async clickOnRandomAvailableProductsFixed(
    totalSelect: number,
  ): Promise<void> {
    if (totalSelect <= 0) return;

    const availableButtons = await this.getAvailableProductButtonsFixed();

    if (availableButtons.length === 0) return;

    const utils = new Utils();
    const randomUniqueNumbers = utils.getUniqueRandomNumbers(
      availableButtons.length,
      totalSelect,
    );

    console.log('Random items to select: ' + totalSelect);
    for (const index of randomUniqueNumbers) {
      await availableButtons[index].click();
    }
  }
}

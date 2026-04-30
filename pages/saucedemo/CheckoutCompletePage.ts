import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly thankyouOrderLabel: Locator;
  readonly thankyouOrderText: string;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.thankyouOrderText = 'Thank you for your order!';
    this.thankyouOrderLabel = page.locator('h2[data-test="complete-header"]');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async clickOnBackHomeButton(): Promise<void> {
    await this.backHomeButton.click();
  }

  async getThankyouOrderText(): Promise<string> {
    return await this.thankyouOrderLabel.innerText();
  }
}

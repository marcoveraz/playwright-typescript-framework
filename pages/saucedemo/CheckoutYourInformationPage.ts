import { Locator, Page } from '@playwright/test';

export class CheckoutYourInformationPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
  }

  async clickOnContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  async setFirstName(value: string): Promise<void> {
    await this.firstNameInput.fill(value);
  }

  async setLastName(value: string): Promise<void> {
    await this.lastNameInput.fill(value);
  }

  async setPostalCode(value: string): Promise<void> {
    await this.postalCodeInput.fill(value);
  }
}

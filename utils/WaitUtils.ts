import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class WaitUtils {
  async waitForPageReady(
    page: Page,
    url: string | RegExp,
    locator: Locator,
  ): Promise<void> {
    await expect(page).toHaveURL(url);
    await expect(locator).toBeVisible();
  }
}

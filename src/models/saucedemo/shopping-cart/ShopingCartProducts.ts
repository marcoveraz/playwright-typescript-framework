import { Locator } from '@playwright/test';

export type ShopingCartProducts = {
  name: string;
  removeButton: Locator;
  price: string;
};

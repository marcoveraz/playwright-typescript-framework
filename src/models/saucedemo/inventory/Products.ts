import { Locator } from '@playwright/test';

export type Product = {
  name: string;
  button: Locator;
  price: string;
};

export type ProductAndPrice = {
  name: string;
  price: string;
};

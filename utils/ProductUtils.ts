import { ProductAndPrice } from '../models/saucedemo/inventory/Products';

export class ProductUtils {
  getTotalPrice(products: ProductAndPrice[]): number {
    return products.reduce((total, product) => {
      const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
      return total + price;
    }, 0);
  }
}

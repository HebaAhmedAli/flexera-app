import { jsonIgnore } from 'json-ignore';

import { ProductModel } from "./product.model";

export class OrderItemModel {
  id!: number;
  quantity!: number;
  productId!: number;
  @jsonIgnore()
  product!: ProductModel;
}

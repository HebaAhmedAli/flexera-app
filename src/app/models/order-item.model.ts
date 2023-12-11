import { ProductModel } from "./product.model";

export class OrderItemModel {
  id!: number;
  quantity!: number;
  productId!: number;
  product!: ProductModel;
}

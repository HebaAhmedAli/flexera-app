import { ProductSizesModel } from "./product-sizes.model";

export class SelectedSizesItemModel {
  id!: number;
  quantity!: number;
  price!: number;
  productSizeId!: number;
  productSize!: ProductSizesModel;
}

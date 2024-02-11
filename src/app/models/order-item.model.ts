import { jsonIgnore } from 'json-ignore';

import { ProductModel } from "./product.model";
import { SelectedSizesItemModel } from './selected-sizes-item.model';

export class OrderItemModel {
  id!: number;
  quantity!: number;
  productId!: number;
  price!: number;
  selectedSizesItems!: SelectedSizesItemModel[];
  @jsonIgnore()
  product!: ProductModel;
}

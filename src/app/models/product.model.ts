import { GalleryItem } from "./gallery-item.model";
import { ProductSizesModel } from "./product-sizes.model";

export class ProductModel {
  id!: number;
  name!: string;
  price!: number;
  description!: string;
  longDescription!: string;
  maintenance!: string;
  img!: string;
  type!: string;
  sellingRate!: number;
  installmentPlan!: string;
  gallery!: Array<GalleryItem>;
  warranty!: number;
  priceAfterDiscount!: number;
  available!: string;
  sizes!: ProductSizesModel[];
  enable!: boolean;
  preBooking!: string;
}

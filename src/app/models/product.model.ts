import { GalleryItem } from "./gallery-item.model";

export class ProductModel {
  id!: number;
  name!: string;
  price!: number;
  description!: string;
  longDescription!: string;
  img!: string;
  type!: string;
  sellingRate!: number;
  installmentPlan!: string;
  gallery!: Array<GalleryItem>;
}

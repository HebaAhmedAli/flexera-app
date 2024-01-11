import { ProductModel } from "./product.model";

export class DeviceModel {
  id!: number;
  productId!: number;
  product!: ProductModel;
  serialNumber!: string;
  warrantyPeriod!: number;
  warrantyStartDate!: Date | string;
  receiptUrl?: string;
  stickerUrl?: string;
}

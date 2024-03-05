import { jsonIgnore } from "json-ignore";
import { AreaModel } from "./area.model";
import { OrderItemModel } from "./order-item.model";

export class OrderModel {
  id!: number;
  no!: number;
  paymentMethod!: string;
  receiptUrl!: string;
  status!: string;
  totalPrice!: number;
  deliveryAddress!: string;
  locationLat!: string;
  locationLng!: string;
  cityName!: string;
  areaName!: string;
  areaId!: number;
  date!: Date;
  orderItems!: OrderItemModel[];
  expanded: boolean = false;
  promoCode!: string;
  applyPromoRequest: boolean = false;
  area!: AreaModel;
}

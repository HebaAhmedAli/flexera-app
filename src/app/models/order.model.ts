import { jsonIgnore } from "json-ignore";
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
  date!: Date;
  orderItems!: OrderItemModel[];
  expanded: boolean = false;
}

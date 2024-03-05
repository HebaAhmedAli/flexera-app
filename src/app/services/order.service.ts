import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignUpRequestModel } from '../models/signup-request.model';
import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';
import { SecureStorage } from './secure-storage.service';
import { OrderModel } from '../models/order.model';
import { AuthService } from './auth.service';
import { jsonIgnoreReplacer } from 'json-ignore';
import { OrderItemModel } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
   }

  public createOrder(order: OrderModel): Observable<HttpResponse<Object>> {
    // TODO: Make this work: const data = JSON.stringify(order, jsonIgnoreReplacer);
    const orderIgnoredJson = new OrderModel();
    orderIgnoredJson.deliveryAddress = order.deliveryAddress;
    orderIgnoredJson.paymentMethod = order.paymentMethod;
    orderIgnoredJson.totalPrice = order.totalPrice;
    orderIgnoredJson.cityName = order.cityName;
    orderIgnoredJson.areaId = order.areaId;
    orderIgnoredJson.locationLat = order.locationLat;
    orderIgnoredJson.locationLng = order.locationLng;
    orderIgnoredJson.promoCode = order.promoCode;
    orderIgnoredJson.applyPromoRequest = true;
    orderIgnoredJson.orderItems = new Array<OrderItemModel>();
    order.orderItems.forEach(item => {
      const orderItem = new OrderItemModel();
      orderItem.productId = item.productId;
      orderItem.quantity = item.quantity;
      orderItem.selectedSizesItems = item.selectedSizesItems;
      orderIgnoredJson.orderItems.push(orderItem);
    })
    return this.httpClient.post(`${environment.baseUrl}/api/v1/create-order`, orderIgnoredJson, { observe: 'response' });
  }

  public getOrderTotalPrice(order: OrderModel): Observable<HttpResponse<Object>> {
    // TODO: Make this work: const data = JSON.stringify(order, jsonIgnoreReplacer);
    const orderIgnoredJson = new OrderModel();
    orderIgnoredJson.paymentMethod = order.paymentMethod;
    orderIgnoredJson.areaId = order.areaId;
    orderIgnoredJson.promoCode = order.promoCode;
    orderIgnoredJson.applyPromoRequest = order.applyPromoRequest;
    orderIgnoredJson.orderItems = new Array<OrderItemModel>();
    order.orderItems.forEach(item => {
        const orderItem = new OrderItemModel();
        orderItem.productId = item.productId;
        orderItem.quantity = item.quantity;
        orderItem.selectedSizesItems = item.selectedSizesItems;
        orderIgnoredJson.orderItems.push(orderItem);


    })
    return this.httpClient.post(`${environment.baseUrl}/api/v1/get-order-total-price`, orderIgnoredJson, { observe: 'response' });
  }

  public getOrders(): Observable<Array<OrderModel>> {
    return this.httpClient.get<Array<OrderModel>>(
      `${environment.baseUrl}/api/v1/my-orders`
    );
  }

  public deleteOrder(orderId: any): Observable<HttpResponse<Object>> {
    return this.httpClient.delete<HttpResponse<Object>>(
      `${environment.baseUrl}/api/v1/orders/${orderId}`,  { observe: 'response' }
    );
  }


}

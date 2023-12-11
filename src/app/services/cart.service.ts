import { Injectable } from '@angular/core';
import { OrderItemModel } from '../models/order-item.model';
import { OrderModel } from '../models/order.model';
import { ProductModel } from '../models/product.model';
import { SecureStorage } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  order!: OrderModel;

  cartCounter: number = 0;

  constructor(private storage: SecureStorage) {
   }

   async initializeCart() {
    this.order = await this.storage.get('cart-order') as OrderModel;
    if(!this.order) {
      this.order = new OrderModel();
      this.order.orderItems = new Array<OrderItemModel>()
    }
   }

  addProductToCart(product: ProductModel): void {
    var orderItem = this.order.orderItems.find(orderItem => product.id === orderItem.productId);
    if(orderItem) {
      orderItem.quantity +=1;
    } else {
      orderItem =  new OrderItemModel();
      orderItem.productId = product.id;
      orderItem.quantity = 1;
      orderItem.product = product;
      this.order.orderItems.push(orderItem);
    }

    this.storage.set('cart-order', this.order);
  }

  decreaseProductQuantityInCart(product: ProductModel): void {
    if(this.getCartCounter() === 0) return;
    const orderItem = this.order.orderItems.find(orderItem => product.id === orderItem.productId);
    if(orderItem) {
      orderItem.quantity -= 1;
      if(orderItem.quantity === 0) {
        this.removeProductFromCart(product);
      }
    }
    this.storage.set('cart-order', this.order);
  }

  removeProductFromCart(product: ProductModel): void {
    if(this.getCartCounter() === 0) return;
    const index = this.order.orderItems.findIndex(orderItem => product.id === orderItem.productId);
    if(index !== -1) {
      this.order.orderItems.splice(index, 1);
    }
    this.storage.set('cart-order', this.order);
  }

  getCartCounter(): number {
    this.cartCounter = 0;
    this.order.orderItems.forEach(orderItem => {
      this.cartCounter +=  orderItem.quantity;
    });
    return this.cartCounter;
  }

  calculateTotalPrice(): number {
    var totalPrice = 0;
    this.order.orderItems.forEach(orderItem => {
      totalPrice += orderItem.product.price * orderItem.quantity;
    });
    return totalPrice;
  }


  getProductQuantityIncart(product: ProductModel): number {
    if(!product) return 0;
    const orderItem = this.order.orderItems.find(orderItem => product.id === orderItem.productId);
    if(orderItem) return orderItem.quantity;
    return 0;
  }

}

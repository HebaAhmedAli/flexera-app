import { Injectable } from '@angular/core';
import { OrderItemModel } from '../models/order-item.model';
import { OrderModel } from '../models/order.model';
import { ProductSizesModel } from '../models/product-sizes.model';
import { ProductModel } from '../models/product.model';
import { SelectedSizesItemModel } from '../models/selected-sizes-item.model';
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
      this.order.orderItems = new Array<OrderItemModel>();
    }
   }

  addProductToCart(product: ProductModel, productSize: ProductSizesModel | undefined): void {
    var orderItem = this.order.orderItems.find(orderItem => product.id === orderItem.productId);
    if(orderItem) {
      if(productSize) {
       var selectedSize = orderItem.selectedSizesItems.find(size => size.productSizeId === productSize.id);
       if(selectedSize) {
        selectedSize.quantity += 1;
       } else {
          selectedSize =  new SelectedSizesItemModel();
          selectedSize.productSizeId = productSize.id;
          selectedSize.quantity = 1;
          selectedSize.productSize = productSize;
          orderItem.selectedSizesItems.push(selectedSize);
       }
      } else {
        orderItem.quantity +=1;
      }
    } else {
      orderItem =  new OrderItemModel();
      orderItem.productId = product.id;
      orderItem.quantity = 1;
      orderItem.product = product;
      if(productSize) {
        selectedSize =  new SelectedSizesItemModel();
        selectedSize.productSizeId = productSize.id;
        selectedSize.quantity = 1;
        selectedSize.productSize = productSize;
        orderItem.selectedSizesItems = new Array<SelectedSizesItemModel>();
        orderItem.selectedSizesItems.push(selectedSize);

        orderItem.quantity = 0;
      }
      this.order.orderItems.push(orderItem);
    }

    this.storage.set('cart-order', this.order);
  }

  decreaseProductQuantityInCart(product: ProductModel, productSizeId: number | undefined): void {
    if(this.getCartCounter() === 0) return;
    const orderItem = this.order.orderItems.find(orderItem => product.id === orderItem.productId);
    if(orderItem) {
      if(productSizeId) {
        const selectedSize = orderItem.selectedSizesItems.find(size => size.productSizeId === productSizeId);
        if(selectedSize)
          selectedSize.quantity -= 1;
          if(selectedSize?.quantity === 0) {
            this.removeProductFromCart(product, productSizeId);
            if(orderItem.selectedSizesItems.length === 0) {
              this.removeProductFromCart(product, undefined);
            }
          }
      } else {
        orderItem.quantity -= 1;
        if(orderItem.quantity === 0) {
          this.removeProductFromCart(product, undefined);
        }
      }
    }
    this.storage.set('cart-order', this.order);
  }

  removeProductFromCart(product: ProductModel, productSizeId: number | undefined): void {
    if(this.getCartCounter() === 0) return;
    if(productSizeId) {
      const orderItem = this.order.orderItems.find(orderItem => product.id === orderItem.productId)
      const sizeIndex = orderItem?.selectedSizesItems.findIndex(size => size.productSizeId === productSizeId);

      if(sizeIndex !== -1)
        {
          orderItem?.selectedSizesItems.splice(Number(sizeIndex), 1);
          if(orderItem?.selectedSizesItems.length === 0) {
            const index = this.order.orderItems.findIndex(orderItem => product.id === orderItem.productId);
            if(index !== -1)
              this.order.orderItems.splice(index, 1);
          }
        }
    } else {
      const index = this.order.orderItems.findIndex(orderItem => product.id === orderItem.productId);
      if(index !== -1)
        this.order.orderItems.splice(index, 1);
    }
    this.storage.set('cart-order', this.order);
  }

  getCartCounter(): number {
    this.cartCounter = 0;
    this.order.orderItems.forEach(orderItem => {
      if(orderItem.selectedSizesItems && orderItem.selectedSizesItems.length > 0) {
        orderItem.selectedSizesItems.forEach(size => {
          this.cartCounter += size.quantity;
        });
      } else {
        this.cartCounter +=  orderItem.quantity;
      }
    });
    return this.cartCounter;
  }

  // calculateTotalPrice(): number {
  //   var totalPrice = 0;
  //   this.order.orderItems.forEach(orderItem => {
  //     totalPrice += orderItem.product.price * orderItem.quantity;
  //   });
  //   return totalPrice;
  // }


  getProductQuantityIncart(product: ProductModel, productSizeId: number | undefined): number {
    if(!product) return 0;
    const orderItem = this.order.orderItems.find(orderItem => product.id === orderItem.productId);
    if(productSizeId) {
      const productSize = orderItem?.selectedSizesItems.find(size => size.productSizeId === productSizeId);
      if(productSize) return productSize.quantity;
      return 0;
    }
    if(orderItem) return orderItem.quantity;
    return 0;
  }

  emptyTheCart() {
    this.storage.set('cart-order', null);
    this.order = new OrderModel();
    this.order.orderItems = new Array<OrderItemModel>()
  }

}

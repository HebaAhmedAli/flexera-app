import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  mode!: string;
  cartOrder!: OrderModel;
  constructor(private cartService: CartService, private storage: SecureStorage) {

  }

  async ngOnInit() {
    this.cartOrder = this.cartService.order;
    this.mode =   await this.storage.get('mode');
  }

  removeProductFromCart(product: ProductModel) {
    this.cartService.removeProductFromCart(product);
  }

  get totalPrice() {
    return this.cartService.calculateTotalPrice();
  }


}

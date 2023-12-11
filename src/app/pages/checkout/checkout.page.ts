import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  paymentMethod = 'cash';
  address = '';
  editAddress = false;
  order!: OrderModel;

  constructor(private cartService: CartService, private storage: SecureStorage) { }

  async ngOnInit() {
    this.address =  (await this.storage.get('user') as UserModel).address;
    this.order = this.cartService.order;
  }

  get totalPrice() {
    return this.cartService.calculateTotalPrice();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentInstructionsModalComponent } from 'src/app/components/payment-instructions-modal/payment-instructions-modal.component';
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

  constructor(private cartService: CartService, private storage: SecureStorage, private modalController: ModalController) { }

  async ngOnInit() {
    this.address =  (await this.storage.get('user') as UserModel).address;
    this.order = this.cartService.order;
  }

  get totalPrice() {
    return this.cartService.calculateTotalPrice();
  }


  async openPaymentInstructionsModal(paymentMethod: string) {
    const modal = await this.modalController.create({
      component: PaymentInstructionsModalComponent,
      cssClass: 'payment-modal',
      componentProps: {
        paymentMethod,
        totalPrice: this.totalPrice
      }
    });
    return await modal.present();
  }

}

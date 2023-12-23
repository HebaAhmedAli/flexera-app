import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PaymentInstructionsModalComponent } from 'src/app/components/payment-instructions-modal/payment-instructions-modal.component';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
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
  message!: string;
  isAlertOpen = false;
  city!: string;
  area!: string;


  constructor(private cartService: CartService, private storage: SecureStorage, private modalController: ModalController, private orderService: OrderService
    , private router: Router) { }

  async ngOnInit() {
    this.address =  (await this.storage.get('user') as UserModel).address;
    this.order = this.cartService.order;
  }

  get totalPrice() {
    return this.cartService.calculateTotalPrice();
  }


  async createOrder() {
    this.order.deliveryAddress = this.address;
    this.order.paymentMethod = this.paymentMethod;
    this.order.totalPrice = this.totalPrice;
    this.orderService.createOrder(this.order).subscribe(async (response: any) => {
      console.log(response);
      if(response.status === 200) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            orderId: (response.body as OrderModel).id,
            orderStatus: (response.body as OrderModel).status
          }
        };
        this.cartService.emptyTheCart();
        this.router.navigate(['/order-success'], navigationExtras);
      } else {
        this.message = response.error.message;
        this.isAlertOpen = true;
      }
    }, error => {
      console.log(error)
      this.message = error.error.message;
      this.isAlertOpen = true;
    }
    );
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

  async alertDismiss() {
    this.isAlertOpen = false;

  }


}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PaymentInstructionsModalComponent } from 'src/app/components/payment-instructions-modal/payment-instructions-modal.component';
import { AreaModel } from 'src/app/models/area.model';
import { CityModel } from 'src/app/models/city.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { CityService } from 'src/app/services/city.service';
import { OrderService } from 'src/app/services/order.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { SelectLocationPage } from '../select-location/select-location.page';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  paymentMethod = 'cash';
  address!: string;
  editAddress = true;
  order!: OrderModel;
  message!: string;
  isAlertOpen = false;
  city!: CityModel;
  area!: AreaModel;
  googleMapAddressDetails!: string;
  cities: CityModel[] = [];
  areas: AreaModel[] = [];

  location: any = {lat: null, lng: null, name: ''};

  constructor(private cartService: CartService, private storage: SecureStorage, private modalController: ModalController, private orderService: OrderService
    , private router: Router, private cityService: CityService) { }

  async ngOnInit() {
    // this.address =  (await this.storage.get('user') as UserModel).address;
    this.order = this.cartService.order;
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    },
    err => {
      console.log(err);
    })
  }

  get totalPrice() {
    var total = this.cartService.calculateTotalPrice();
    const percentage = 1; // TODO: Get from data base.
    total += (percentage * total / 100)
    if(this.paymentMethod !== 'pickup') {
      total += this.area?.price ? this.area?.price : 0;
    }
    return total;
  }


  async createOrder() {
    if(!this.address || !this.city || !this.area || !this.googleMapAddressDetails) {
      this.message = 'You must fill addrees details to continue.'
      this.isAlertOpen = true;
      return;
    }
    this.order.deliveryAddress = this.address;
    this.order.paymentMethod = this.paymentMethod;
    this.order.totalPrice = this.totalPrice ;
    this.order.cityName = this.city.name;
    this.order.areaName = this.area.name;
    this.order.locationLat = this.location.lat;
    this.order.locationLng = this.location.lng;
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

  async selectLocationOnMap() {
    this.googleMapAddressDetails = 'Map detailed address';
    // TO DO: Set lat and lng
    let modal = await this.modalController.create({
      component: SelectLocationPage
    });

    modal.onDidDismiss().then((location: any) => {
        this.location = location.data;
        console.log(location);
    });

    modal.present();
    console.log('to be implemented')
  }



  citySelected(event: any) {
    console.log(event);
  }

}

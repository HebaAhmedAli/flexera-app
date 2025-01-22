import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PaymentInstructionsModalComponent } from 'src/app/components/payment-instructions-modal/payment-instructions-modal.component';
import { AreaModel } from 'src/app/models/area.model';
import { CityModel } from 'src/app/models/city.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { CityService } from 'src/app/services/city.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { SelectLocationPage } from '../select-location/select-location.page';
import { SystemParametersService } from 'src/app/services/system-parameters.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  paymentMethod = 'pickup';
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

  totalPrice!: number;

  location: any = {lat: null, lng: null, name: ''};

  products: ProductModel[] = [];

  promoCode!: string;

  showCashOnDelivery = false;

  constructor(private cartService: CartService, private storage: SecureStorage, private modalController: ModalController, private orderService: OrderService
    , private router: Router, private cityService: CityService, private productService: ProductService, private sysParamServ: SystemParametersService) { }

  async ngOnInit() {
    // this.address =  (await this.storage.get('user') as UserModel).address;
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.filter(product => product.enable);
      this.cartService.order.orderItems = this.cartService.order.orderItems.filter(item => {
        const prod = this.products.find(product => item.product.id === product.id);
        return prod?.available  || (!prod?.available && prod?.preBooking === 'true');
       } );

      this.storage.set('cart-order',  this.cartService.order);
      this.order = this.cartService.order;
      this.calculateOrderTotalPrice();
    },
    err => {
      console.log(err);
    })

    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    },
    err => {
      console.log(err);
    });
    this.showCashOnDelivery = this.sysParamServ.getValue('SHOW_CASH_ON_DELIVERY') === 'Y';
  }

  calculateOrderTotalPrice(openModal: boolean = false, applyPromoRequest: boolean = false) {
    if(applyPromoRequest && !this.promoCode) {
      this.message = "Please enter a promocode first!";
      this.isAlertOpen = true;
      return;
    }
    console.log('calculateOrderTotalPrice')
    this.order.paymentMethod = this.paymentMethod;
    this.order.areaId = this.area?.id;
    this.order.applyPromoRequest = applyPromoRequest;
    console.log(this.order.applyPromoRequest)
    this.order.promoCode = this.promoCode;
    this.orderService.getOrderTotalPrice(this.order).subscribe(async (response: any) => {
      if(response.status === 200) {
        this.totalPrice = response.body.totalPrice;
        if(openModal && (this.paymentMethod === 'etisalat-cash' || this.paymentMethod === 'vodafone-cash' || this.paymentMethod === 'instapay')) {
          this.openPaymentInstructionsModal(this.paymentMethod);
        }
        if(applyPromoRequest) {
          this.message = "Promo code applied successfully!";
           this.isAlertOpen = true;
        }

      } else {
        if(applyPromoRequest) {
          this.promoCode = "";
          this.calculateOrderTotalPrice();
        }
        this.message = response.error.message;
        this.isAlertOpen = true;
      }
    }, error => {
      console.log(error)
      if(applyPromoRequest) {
        this.promoCode = "";
        this.calculateOrderTotalPrice();
      }
      this.message = error.error.message;
      this.isAlertOpen = true;
    }
    );
  }


  async createOrder() {
    if(!this.address || !this.city || !this.area || !this.googleMapAddressDetails) {
      this.message = 'You must fill addrees details to continue.'
      this.isAlertOpen = true;
      return;
    }
    this.order.deliveryAddress = this.address;
    this.order.paymentMethod = this.paymentMethod;
    this.order.totalPrice = this.totalPrice;
    this.order.cityName = this.city.name;
    this.order.areaName = this.area.name;
    this.order.areaId = this.area.id;
    this.order.locationLat = this.location.lat;
    this.order.locationLng = this.location.lng;
    this.order.promoCode = this.promoCode;
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


  getProductUpdatedPrice(productId: number): number {
    const product = this.products.find(product => product.id === productId);
    return (product ? product.priceAfterDiscount : 0 );
  }


  getProductSizeUpdatedPrice(productId: number, productSizeId: number): number {
    const product = this.products.find(product => product.id === productId);
    const productSize = product?.sizes.find(size => size.id === productSizeId);
    return (productSize ? productSize.priceAfterDiscount : 0 );
  }


  calculateTotalPriceWithoutDiscount(): number {
    var totalPrice = 0;
    this.order.orderItems.forEach(orderItem => {
      if ((orderItem.selectedSizesItems ? orderItem.selectedSizesItems  : [] ).length === 0) {
        totalPrice +=  this.getProductUpdatedPrice(orderItem.product.id) * orderItem.quantity;
      } else {
        orderItem.selectedSizesItems.forEach(sizeItem => {
          totalPrice +=  this.getProductSizeUpdatedPrice(orderItem.product.id, sizeItem.productSize.id) * sizeItem.quantity;
        })
      }
    });
    if(this.area && this.order.paymentMethod !== 'pickup') totalPrice += this.area.price;

    return totalPrice;
  }


  getDiscount() {
    return this.calculateTotalPriceWithoutDiscount() - ((this.paymentMethod === 'etisalat-cash' || this.paymentMethod === 'vodafone-cash') ? this.totalPrice * 100 / 101 : this.totalPrice);
  }

  notNan(discount: number): boolean {
    return !Number.isNaN(discount);
  }

}

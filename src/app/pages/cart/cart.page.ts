import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  mode!: string;
  cartOrder!: OrderModel;

  totalPrice!: number;
  constructor(private cartService: CartService, private storage: SecureStorage, private orderService: OrderService) {

  }

  async ngOnInit() {
    this.cartOrder = this.cartService.order;
    this.mode =   await this.storage.get('mode');
    if(this.mode !== 'guest') this.calculateOrderTotalPrice();
  }

  removeProductFromCart(product: ProductModel) {
    this.cartService.removeProductFromCart(product);
  }


  calculateOrderTotalPrice() {
    console.log('calculateOrderTotalPrice')
    this.cartOrder.paymentMethod = this.cartOrder.paymentMethod ? this.cartOrder.paymentMethod :  'pickup';

    this.orderService.getOrderTotalPrice(this.cartOrder).subscribe(async (response: any) => {
      if(response.status === 200) {
        this.totalPrice = response.body.totalPrice;
      }
    }, error => {
      console.log(error)
    }
    );
  }

  getImgUrl(url: string): string {
    return environment.baseUrl + '/' + url;
   }

}

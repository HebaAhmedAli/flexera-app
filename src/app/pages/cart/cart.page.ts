import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
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
  products: ProductModel[] = [];
  constructor(private cartService: CartService, private storage: SecureStorage, private orderService: OrderService, private productService: ProductService) {

  }

  async ngOnInit() {
    this.productService.getAllProducts().subscribe(async data => {
      this.products = data.filter(product => product.enable);
      this.cartService.order.orderItems = this.cartService.order.orderItems.filter(item => {
       const prod = this.products.find(product => item.product.id === product.id);
       return prod?.available  || (!prod?.available && prod?.preBooking === 'true');
      } );
      this.storage.set('cart-order',  this.cartService.order);
      this.cartOrder = this.cartService.order;
      this.mode =   await this.storage.get('mode');
      if(this.mode !== 'guest') this.calculateOrderTotalPrice();
    },
    err => {
      console.log(err);
    })
  }

  removeProductFromCart(product: ProductModel, productSizeId: number | undefined) {
    this.cartService.removeProductFromCart(product, productSizeId);
    this.calculateOrderTotalPrice();
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

   getProductUpdatedPrice(productId: number): number {
    const product = this.products.find(product => product.id === productId);
    return (product ? product.priceAfterDiscount : 0 );
  }

  getProductSizeUpdatedPrice(productId: number, productSizeId: number): number {
    const product = this.products.find(product => product.id === productId);
    const productSize = product?.sizes.find(size => size.id === productSizeId);
    return (productSize ? productSize.priceAfterDiscount : 0 );
  }

}

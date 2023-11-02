import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems : any[]= [];
  constructor() {
    this.cartItems = [
      {
        name: 'Hyper Light',
        price: '1000 EGP',
        description: 'Premium x-Ray.',
        img: 'assets/products/hyper-light.jpeg',
        quantity: 2
      },
      {
        name: 'Nano pix',
        price: '2000 EGP',
        description: 'Premium x-Ray Premium x-Ray...',
        img: 'assets/products/nano-pix.jpeg',
        quantity: 1

      },
      {
        name: 'Material Device',
        price: '1000 EGP',
        description: 'Premium x-Ray.',
        img: 'assets/products/material-device.jpeg',
        quantity: 2

      },
      {
        name: 'Digital Device',
        price: '2000 EGP',
        description: 'Premium x-Ray Premium x-Ray...',
        img: 'assets/products/digital-device.jpeg',
        quantity: 1

      }
    ];
  }

  ngOnInit() {
  }

  removeItemFromCart(item: any) {
    const index = this.cartItems.indexOf(item, 0);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

}

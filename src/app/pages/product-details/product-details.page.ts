import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  swiper: Swiper;
  productCounter: number = 0;

  constructor(public cartService: CartService) {
    this.swiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      slidesPerView: 1,
      loop: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.swiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
 }

 addProduct() {
  this.productCounter = this.productCounter + 1;
  this.cartService.increaseCartCounter();
 }

 removeProduct() {
  if(this.productCounter === 0) return;
  this.productCounter = this.productCounter - 1;
  this.cartService.decreaseCartCounter();
 }

}

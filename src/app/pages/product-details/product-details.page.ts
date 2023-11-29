import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  swiper: Swiper;
  productCounter: number = 0;
  productId: number = 0;

  product!: ProductModel;

  constructor(public cartService: CartService, private productService: ProductService, private route: ActivatedRoute) {
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
    this.productId = Number(this.route.snapshot.paramMap.get('productId') as string);
    this.productService.getProductById(this.productId).subscribe(data => {
      this.product = data;
    }, err => {
      console.log(err);
    })
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

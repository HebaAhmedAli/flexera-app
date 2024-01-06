import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsPage implements OnInit {
  swiper: Swiper;
  productId: number = 0;

  product!: ProductModel;
  segmentValue: string = 'description';

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
  this.cartService.addProductToCart(this.product);
 }

 removeProduct() {
  if(this.productCounter === 0) return;
  this.cartService.decreaseProductQuantityInCart(this.product);
 }


 get productCounter(): number {
  return this.cartService.getProductQuantityIncart(this.product);
 }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSizesModel } from 'src/app/models/product-sizes.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';

declare var window: any;

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
  isToastOpen = false;
  mode!: string;
  isAlertOpen = false;

  toastMessage!: string;

  whatsappLink!: string ;

  selectedSize!: ProductSizesModel;


  constructor(public cartService: CartService, private productService: ProductService, private route: ActivatedRoute, private storage: SecureStorage) {
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

  async ngOnInit() {
    this.mode = await this.storage.get('mode');
    this.productId = Number(this.route.snapshot.paramMap.get('productId') as string);
    this.productService.getProductById(this.productId).subscribe(data => {
      this.product = data;

      this.whatsappLink = "https://api.whatsapp.com/send?phone=0201090737501&text=I want to use the installment plan for product " + this.product.name;
    }, err => {
      console.log(err);
    });

    // var landscape = window.matchMedia("(orientation: landscape)");
    // landscape.addEventListener("change", (ev: any) => {
    //   console.log(ev);
    //   alert('land')
    //   if( window.innerHeight == screen.height) {
    //     // browser is fullscreen
    //     alert(window.innerHeight == screen.height)
    // }
    // });


    // window.addEventListener('orientationchange', (_: any) => {
    //   alert('window' + screen.orientation.type + " " + screen.orientation.angle);
    //   if( window.innerHeight == screen.height) {
    //     // browser is fullscreen
    //     alert(window.innerHeight == screen.height)
    // }
    //   }, false);
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

  if(this.mode === 'guest') {
    this.isAlertOpen = true;
    return;
  }
  this.cartService.addProductToCart(this.product, this.selectedSize ? this.selectedSize : undefined);
  this.toastMessage = "Added to cart successfully!";
  this.isToastOpen = true;
 }

 removeProduct() {
  if(this.productCounter === 0) return;
  this.cartService.decreaseProductQuantityInCart(this.product,  this.selectedSize ? this.selectedSize.id : undefined);
  this.toastMessage = "Removed from cart successfully!";
  this.isToastOpen = true;
 }


 get productCounter(): number {
  return this.cartService.getProductQuantityIncart(this.product,  this.selectedSize ? this.selectedSize.id : undefined);
 }

 getImgUrl(url: string): string {
  return environment.baseUrl + '/' + url;
 }


/* Function to open fullscreen mode */
 openFullscreen(imgId: string) {
  // var elem = document.getElementById(imgId);

  // /* If fullscreen mode is available, show the element in fullscreen */
  // if (
  //   document.fullscreenEnabled
  // ) {

  //   /* Show the element in fullscreen */
  //   if (elem && elem.requestFullscreen) {
  //     elem.requestFullscreen(); /* Standard syntax */
  //   }
  // }
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { AddsService } from 'src/app/services/adds.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalService } from 'src/app/services/global.service';
import { ProductService } from 'src/app/services/product.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { SystemParametersService } from 'src/app/services/system-parameters.service';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {
  categorySwiper!: Swiper;
  orderNowSwiper!: Swiper;
  bestSellerSwiper!: Swiper;

  categories: Array<CategoryModel>  = [];
  products: Array<ProductModel> = [] ;
  orderNowProducts: Array<ProductModel> = [] ;
  bestSellerProducts: Array<ProductModel> = [] ;


  showOrderNow = true;
  showBestSeller = true;



  searchTerm: string = '';
  filteredProducts: ProductModel[] = [];

  isToastOpen = false;
  mode!: string;
  isAlertOpen = false;

  toastMessage!: string;

  message!: string;


  constructor(private categoryService: CategoryService,
    private globalService: GlobalService,
    private sysParamServ: SystemParametersService,
    private modalController: ModalController,
    private productService: ProductService,
    private addsService: AddsService,
    private platform: Platform,
    private router: Router,
    private storage: SecureStorage,
    private cartService: CartService
  ) { }

  async ngOnInit() {

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    },
    err => {
      console.log(err);
    });



    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.bestSellerProducts = this.products.filter(pr => pr.sellingRate >= 100 && pr.sellingRate < 200);
      this.bestSellerProducts = this.bestSellerProducts.sort((a,b) => a.sellingRate - b.sellingRate);
      this.orderNowProducts = this.products.filter(pr => pr.sellingRate >= 200 && pr.sellingRate < 300);
      this.orderNowProducts = this.orderNowProducts.sort((a,b) => a.sellingRate - b.sellingRate);
    },
    err => {
      console.log(err);
    })



  }

  ionViewDidEnter() {

    if(!this.categorySwiper) {


      this.categorySwiper = new Swiper('.category-swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 4
      });
      this.orderNowSwiper = new Swiper('.order-now-swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 2
      });

      this.bestSellerSwiper = new Swiper('.best-seller-swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 2
      });
    }




 }



  getImgUrl(url: string): string {
    return environment.baseUrl + '/' + url;
   }

   getCategoryNmaeFormatted(name: string) {
    return name.split('-')[0].charAt(0).toUpperCase() + name.split('-')[0].slice(1);
    }






filterItems() {
  if(this.searchTerm == '') {
    this.filteredProducts = [];
    return;
  }
  this.filteredProducts = this.products.filter(item =>
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


clearFilter() {
  this.filteredProducts = [];
}

filterProductClicked(id: number) {
  this.router.navigate(['/product-details', {productId: id}]);
  this.searchTerm = '';
  this.clearFilter();
}

  async addProduct(product: ProductModel) {
  this.mode = await this.storage.get('mode');

  if(this.mode === 'guest') {
    this.isAlertOpen = true;
    this.message = 'You need to login first to be able to add products to cart.'
    return;
  }

  if(product.sizes.length > 0) {
    this.router.navigate(['/product-details',{productId: product.id}]);
    return;
  }

  if(product.available.toString() === 'false' && product.preBooking !== 'true') {
    this.isAlertOpen = true;
    this.message = 'This product is out of stock.'
    return;
  }

  this.cartService.addProductToCart(product, undefined);
  this.toastMessage = "Added to cart successfully!";
  this.isToastOpen = true;
 }

}

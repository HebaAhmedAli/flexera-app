import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { FullScreenModalComponent } from 'src/app/components/full-screen-modal/full-screen-modal.component';
import { ProductFullGalleryModalComponent } from 'src/app/components/product-full-gallery-modal/product-full-gallery-modal.component';
import { Adds } from 'src/app/models/adds.model';
import { CategoryModel } from 'src/app/models/category.model';
import { GalleryItem } from 'src/app/models/gallery-item.model';
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
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  addsSwiper!: Swiper;
  categorySwiper!: Swiper;
  orderNowSwiper!: Swiper;
  bestSellerSwiper!: Swiper;

  categories: Array<CategoryModel>  = [];
  products: Array<ProductModel> = [] ;
  orderNowProducts: Array<ProductModel> = [] ;
  bestSellerProducts: Array<ProductModel> = [] ;
  adds: Array<Adds>  = [];
  videoFixed = false;


  showOrderNow = true;
  showBestSeller = true;


  justClickSegment = false;

  searchTerm: string = '';
  filteredProducts: ProductModel[] = [];

  isToastOpen = false;
  mode!: string;
  isAlertOpen = false;

  toastMessage!: string;

  addsActiveIndex = 0;


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

    this.addsService.getAddss().subscribe(data => {
      this.adds = data;
      this.videoFix();
    },
    err => {
      console.log(err);
    })

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

    const showEventPopup = this.sysParamServ.getValue('SHOW_EVENT_SPLASH') as string;
      if(showEventPopup === 'Y' && !this.globalService.eventScreenShowed) {
            const modalEl = await this.modalController.create({
              component: FullScreenModalComponent,
              cssClass: 'gallery-full-modal',
              componentProps: {
                url: 'images/event.png',
                type: 'img'
              },
              backdropDismiss: true
            });
            return await modalEl.present();

      }

  }

  ionViewDidEnter() {

    if(!this.addsSwiper) {
      this.addsSwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        on: {
          slideChange: () => {
            // Arrow function keeps the outer `this`
            this.addsActiveIndex = this.addsSwiper.activeIndex;
            console.log('Active Slide Index:', this.addsSwiper.activeIndex);
          },
        },
      });

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

   this.videoFix();



 }


//  get addsActiveIndex() {
//   return this.addsSwiper?.activeIndex;
//  }


 videoFix() {
  if(this.platform.is("ios")) return;
  if(this.videoFixed) return;
  this.adds?.forEach(adds => {
    if(adds.type === 'video') {
      var video = (document.getElementById(('adds_video' + String(adds.id))) as HTMLVideoElement);
      if(!video) {
        setTimeout(() => {
          this.videoFix();
        }, 100);
        return;
      }
      this.videoFixed = true;
      video.muted = true;
      video.play().then(() => {
        console.log('inside play');
        video.pause();
        video.muted = false;
      },
      err => {
        console.log('err ', err);
      }).catch(err => {
        console.log('err ', err);
      });

    }
  })
 }


  getImgUrl(url: string): string {
    return environment.baseUrl + '/' + url;
   }

   getCategoryNmaeFormatted(name: string) {
    return name.split('-')[0].charAt(0).toUpperCase() + name.split('-')[0].slice(1);
    }


    async openImageViewer(i: number) {
      if(this.justClickSegment) return;
      let galleryList: GalleryItem[] = [];

      this.adds.forEach(add => {
        let gallery = new GalleryItem();
        gallery.type = add.type;
        gallery.url = add.url;
        galleryList.push(gallery);
      });

      const modalEl = await this.modalController.create({
        component: ProductFullGalleryModalComponent,
        cssClass: 'gallery-full-modal',
        componentProps: {
          gallery: galleryList,
          index: i
        },
        backdropDismiss: true
      });
      return await modalEl.present();
    }


segmentClicked() {
  this.justClickSegment = true;
  setTimeout(() => this.justClickSegment = false, 100);
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
    return;
  }

  if(product.sizes.length > 0) {
    this.router.navigate(['/product-details',{productId: product.id}]);
    return;
  }

  this.cartService.addProductToCart(product, undefined);
  this.toastMessage = "Added to cart successfully!";
  this.isToastOpen = true;
 }

}

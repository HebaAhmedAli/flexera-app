import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {


  segmentValue: string = 'devices';
  selectedSortBy: string = 'name';
  categoryImg: string = '';
  categoryName: string = '';
  categoryId: number = 0;
  allProducts : Array<ProductModel> = [];
  devicesProducts : Array<ProductModel> = [];
  materialsProducts :  Array<ProductModel> = [];
  isToastOpen = false;
  mode!: string;
  isAlertOpen = false;
  toastMessage!: string;
  message!: string;


  constructor(private router: ActivatedRoute,private cartService: CartService, private categoryService: CategoryService, private routerr: Router, private storage:SecureStorage) {

  }

  ngOnInit() {
    this.categoryImg = this.router.snapshot.paramMap.get('categoryImg') as string;
    this.categoryName = this.router.snapshot.paramMap.get('categoryName') as string;
    this.categoryId = Number(this.router.snapshot.paramMap.get('categoryId') as string);
    this.categoryService.getProductsOfCategory(this.categoryId).subscribe(data => {
      console.log( this.allProducts)
      data = data.filter(product => product.enable);

      this.allProducts = data.sort((p1, p2) => p1.name.localeCompare(p2.name));
      console.log( this.allProducts)

      this.devicesProducts = this.allProducts .filter(product => product.type === 'device');
      console.log( this.devicesProducts)
      if(this.devicesProducts.length === 0) this.segmentValue = 'material';

      this.materialsProducts = this.allProducts .filter(product => product.type === 'material');
    },
    err => {
      console.log(err);
    });
  }

  changeSelectedSortBy(selectedSort: string, modal: any) {
    this.selectedSortBy = selectedSort;
    if (this.selectedSortBy === 'best-selling') {
      this.allProducts = this.allProducts.sort((p1, p2) => p2.sellingRate - p1.sellingRate);
    } else if(this.selectedSortBy === 'name') {
      this.allProducts = this.allProducts.sort((p1, p2) => p1.name.localeCompare(p2.name));
    } else if(this.selectedSortBy === 'highest-price') {
      this.allProducts = this.allProducts.sort((p1, p2) => p2.price - p1.price);
    } else {
      this.allProducts = this.allProducts.sort((p1, p2) => p1.price - p2.price);
    }
    this.devicesProducts = this.allProducts .filter(product => product.type === 'device');
    this.materialsProducts = this.allProducts .filter(product => product.type === 'material');
    modal.dismiss();
  }

  getImgUrl(url: string): string {
    return environment.baseUrl + '/' + url;
   }

   async addProduct(product: ProductModel) {
    this.mode = await this.storage.get('mode');

    if(this.mode === 'guest') {
      this.isAlertOpen = true;
      this.message = 'You need to login first to be able to add products to cart.'
      return;
    }

    if(product.sizes.length > 0) {
      this.routerr.navigate(['/product-details',{productId: product.id}]);
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

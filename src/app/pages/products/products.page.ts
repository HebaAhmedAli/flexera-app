import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {


  segmentValue: string = 'devices';
  selectedSortBy: string = 'lowest-price';
  categoryImg: string = '';
  categoryId: number = 0;
  allProducts : Array<ProductModel> = [];
  devicesProducts : Array<ProductModel> = [];
  materialsProducts :  Array<ProductModel> = [];
  constructor(private router: ActivatedRoute, private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categoryImg = this.router.snapshot.paramMap.get('categoryImg') as string;
    this.categoryId = Number(this.router.snapshot.paramMap.get('categoryId') as string);
    this.categoryService.getProductsOfCategory(this.categoryId).subscribe(data => {
      console.log( this.allProducts)
      this.allProducts = data.sort((p1, p2) => p1.price - p2.price);
      console.log( this.allProducts)

      this.devicesProducts = this.allProducts .filter(product => product.type === 'device');
      console.log( this.devicesProducts)

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
}

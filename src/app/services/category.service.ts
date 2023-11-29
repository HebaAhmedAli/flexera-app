import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private httpClient: HttpClient) { }


  public getCategories(): Observable<Array<CategoryModel>> {
    return this.httpClient.get<Array<CategoryModel>>(
      `${environment.baseUrl}/api/v1/categories`
    );
  }

  public getProductsOfCategory(categoryId: number): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>(
      `${environment.baseUrl}/api/v1/categories/${categoryId}/products`
    );
  }
}

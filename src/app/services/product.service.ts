import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) { }


  public getProductById(productId: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(
      `${environment.baseUrl}/api/v1/products/${productId}`
    );
  }
}

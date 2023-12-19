import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';
import { UserModel } from '../models/user.model';
import { SecureStorage } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userUpdated: Subject<void> = new Subject();

  constructor(private httpClient: HttpClient, private storage: SecureStorage) { }

  public updateProfile(user: Partial<UserModel>): Observable<UserModel> {
    return this.httpClient.patch<UserModel>(
      `${environment.baseUrl}/api/v1/profile`, user
    );
  }
}

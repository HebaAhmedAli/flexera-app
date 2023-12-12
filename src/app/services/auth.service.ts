import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignUpRequestModel } from '../models/signup-request.model';
import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';
import { SecureStorage } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient, private storage: SecureStorage) { }

  public signUp(signUpReguest: SignUpRequestModel): Observable<HttpResponse<Object>> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, signUpReguest, { observe: 'response' });
  }

  public login(loginReguest: LoginRequestModel): Observable<HttpResponse<LoginResponseModel>> {
    return this.httpClient.post<LoginResponseModel>(`${environment.baseUrl}/api/v1/auth/signin`, loginReguest, { observe: 'response' });
  }

  public getToken(): Observable<string> {
    return from(this.storage.get('token'));
  }
}

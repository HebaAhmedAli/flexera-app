import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }

  private url = `${environment.baseUrl}/api/v1/forgotPassword`;

  sendCode(toEmail: string) {
    const params = new HttpParams().append('email', toEmail);
    return this.http.post<void>(`${this.url}/sendCode`, null, {params});
  }

  verifyCode(email: string, code: string) {
    const params = new HttpParams().append('email', email).append('code', code);
    return this.http.post(`${this.url}/verifyCode`, null, {params});
  }

  resetPassword(email: string, password: string) {
    return this.http.patch(`${this.url}/resetPassword`, {email, password});
  }
}

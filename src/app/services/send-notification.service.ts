import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignUpRequestModel } from '../models/signup-request.model';
import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';
import { SecureStorage } from './secure-storage.service';
import { OrderModel } from '../models/order.model';
import { AuthService } from './auth.service';
import { jsonIgnoreReplacer } from 'json-ignore';
import { OrderItemModel } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class SendNotificationService {

  constructor(private httpClient: HttpClient) {
   }

  public sendNotification(): Observable<HttpResponse<Object>> {
  
     const data = {
      "to" : "/topics/products",
       "priority" : "high",
       "content_available" : true,
       "restricted_package_name": "",
      "notification" : {
      "body" : "great match!",
      "title" : "Portugal vs. Denmark",
      "type": "product",
       "forceStart": "1"
      },
      "data" : {
      "body" : "great match!",
      "title" : "Portugal vs. Denmark",
       "type": "product",
       "forceStart": "1"
      },
      
      "android": {
         "notification": {
           "icon":"fcm_push_icon",
           "click_action": "FCM_PLUGIN_ACTIVITY"
         }
      }
     };
     let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAe_lAs0M:APA91bEg4_ZbzWuJXbv61hjdDym6Nj_UITpCZsabxVlqVII_VsNkwXmvoo3eminuNWvYZg8qKYYPOjmNEYXAUSCdXtR_wCSJYcOO8_sLDOc43Qdv1sYvLPTz0BCyj2tzWRoFZsIDOOIM' });
    return this.httpClient.post(`https://fcm.googleapis.com/fcm/send`, data, { observe: 'response' , headers: headers});
  }

}

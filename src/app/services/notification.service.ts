import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';
import { NotificationModel } from '../models/notification.model';
import { SecureStorage } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  unreadNotificationsCount: number = 0;
  unreadNotificationsCountSubject: Subject<number>;


  notifications: NotificationModel[] = [
  ];

  constructor(private httpClient: HttpClient, private storage: SecureStorage) {
    this.unreadNotificationsCountSubject = new Subject();
   }


  public getNotifications(): void {
    this.httpClient.get<Array<NotificationModel>>(
      `${environment.baseUrl}/api/v1/notifications`
    ).subscribe(async data => {
      this.notifications = data;
      const savedNotifications: NotificationModel[] = await this.storage.get('notifications');
      if(savedNotifications) {
        this.notifications.forEach(item => {
          const savedNot = savedNotifications.find(not => not.id === item.id);
          item.read = savedNot?.read ? true : false;
          item.deleted = savedNot?.deleted ? true : false;
        });
      }
      this.unreadNotificationsCount = this.notifications.filter(not => not.read === false).length;
      this.unreadNotificationsCountSubject.next(this.unreadNotificationsCount);
      this.storage.set('notifications', this.notifications);
    },
    err => {
      console.log(err);
    });
  }

  getUnreadNotificationsCount(): number {
    return this.unreadNotificationsCount;
  }

  getUndeletedNotifications(): NotificationModel[] {
    return this.notifications.filter(not => !not.deleted)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '../models/category.model';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';
import { NotificationModel } from '../models/notification.model';
import { SecureStorage } from './secure-storage.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  unreadNotificationsCount: number = 0;
  unreadNotificationsCountSubject: Subject<number>;

  notificationTapped = false;
  notificationData!: NotificationModel;
  notInWelcome = false;

  notifications: NotificationModel[] = [
  ];

  constructor(private httpClient: HttpClient, private storage: SecureStorage) {
    this.unreadNotificationsCountSubject = new Subject();
   }


  public async getNotifications(): Promise<void> {
    const user = await this.storage.get('user') as UserModel;
    const email = user && user.email ? user.email : 'noUser';
    this.httpClient.get<Array<NotificationModel>>(
      `${environment.baseUrl}/api/v1/notifications/${email}`
    ).subscribe(async data => {
      const savedNotifications: NotificationModel[] = await this.storage.get('notifications');
      if(savedNotifications) {
        data.forEach(item => {
          const savedNot = savedNotifications.find(not => not.id === item.id);
          item.read = savedNot?.read ? true : false;
          item.deleted = savedNot?.deleted ? true : false;
        });
      }
      this.notifications = data;

      this.notifications = this.notifications.sort((not1, not2) => new Date(not2.date).getTime() - new Date(not1.date).getTime());

      this.unreadNotificationsCount = this.getUndeletedNotifications().filter(not => not.read === false).length;
      this.unreadNotificationsCountSubject.next(this.unreadNotificationsCount);
      this.storage.set('notifications', this.notifications);
    },
    err => {
      console.log(err);
    });
  }

  getUnreadNotificationsCount(): number {
    return this.getUndeletedNotifications().filter(not => not.read === false).length;
  }


  getUndeletedNotifications(): NotificationModel[] {
    return this.notifications.filter(not => !not.deleted)
  }

  public setNotificationToken(notifToken: string | null): Observable<any> {
    return this.httpClient.patch<any>(
      `${environment.baseUrl}/api/v1/set-notification-token`, {notificationToken: notifToken}
    );
  }

}

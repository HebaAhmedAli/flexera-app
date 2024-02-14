import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModel } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  constructor(public notificationService: NotificationService, private storage: SecureStorage, private router: Router) { }

  ionViewWillEnter() {
    this.notificationService.getNotifications();
  }

  updateNotifications(item: NotificationModel) {
    item.read = true;
    this.storage.set('notifications', this.notificationService.notifications);
    if(item.urlItemId)
    this.router.navigate([item.url,{productId: item.urlItemId, course_id: item.urlItemId}]);
  }

  deleteNotification(item: NotificationModel) {
    item.deleted = true;
    this.storage.set('notifications', this.notificationService.notifications);

  }


}

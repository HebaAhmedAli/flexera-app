import { Component, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  constructor(public notificationService: NotificationService, private storage: SecureStorage) { }

  ionViewWillEnter() {
    this.notificationService.getNotifications();
  }

  updateNotifications(item: NotificationModel) {
    item.read = true;
    this.storage.set('notifications', this.notificationService.notifications);

  }


}

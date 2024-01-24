import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  splashMode : boolean = false;
  constructor(private router: Router, private storage: SecureStorage, private notificationService: NotificationService) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    const token = await this.storage.get('token');
    if(token) {
      this.splashMode = true;
    } else {
      this.splashMode = false;
    }
    if(this.splashMode) {
      setTimeout(async () => {
        await this.storage.set('mode', 'user');
        if(this.notificationService.notificationTapped) {
          this.notificationService.notificationTapped = false;
          this.notificationService.notInWelcome = true;
          this.router.navigate([this.notificationService.notificationData.url,{productId: this.notificationService.notificationData.urlItemId}]);
        } else {
          this.notificationService.notInWelcome = true;
          this.router.navigateByUrl('tabs');
        }
      }, 3100);
    } else if(this.notificationService.notificationTapped) {
      setTimeout(async () => {
        this.notificationService.notificationTapped = false;
        this.notificationService.notInWelcome = true;
        this.router.navigate([this.notificationService.notificationData.url,{productId: this.notificationService.notificationData.urlItemId}]);
      }, 3100);
    }
  }

  async navigateToTabs() {
    await this.storage.set('mode', 'guest');
    this.notificationService.notInWelcome = true;
    this.router.navigateByUrl('tabs');
  }
}

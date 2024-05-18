import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { FullScreenModalComponent } from 'src/app/components/full-screen-modal/full-screen-modal.component';
import { ProductFullGalleryModalComponent } from 'src/app/components/product-full-gallery-modal/product-full-gallery-modal.component';
import { GlobalService } from 'src/app/services/global.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { SystemParametersService } from 'src/app/services/system-parameters.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  splashMode : boolean = false;
  iosServerVersion: string = '';
  androidServerVersion: string = '';


  forceUpdate!: boolean;

  appId!: string;

  constructor(private router: Router, private storage: SecureStorage, private notificationService: NotificationService, private sysParamServ: SystemParametersService,
    private modalController: ModalController, private globalService: GlobalService, private appVersion: AppVersion, private platform: Platform, private market: Market) { }

  async ngOnInit() {
    await this.checkForceUpateLogic();
    this.platform.resume.subscribe(() => {
      this.checkForceUpateLogic();
    })
  }

 async checkForceUpateLogic() {
    this.iosServerVersion = this.sysParamServ.getValue('IOS_VERSION') as string;
    this.androidServerVersion = this.sysParamServ.getValue('ANDROID_VERSION') as string;
    if(!this.androidServerVersion) {
      this.sysParamServ.sysFectched.subscribe(() => {
        this.checkForceUpateLogic();
      });
      return;
    }
    const currentVersion =  await this.appVersion.getVersionNumber();

    if(this.platform.is('android')) {
      this.appId = await this.appVersion.getPackageName();
      if(this.androidServerVersion !== currentVersion) {
        this.forceUpdate = true;
      } else {
        this.forceUpdate = false;
      }
      console.log(this.appId, currentVersion, this.androidServerVersion , this.forceUpdate);

    } else if (this.platform.is('ios')) {
      this.appId = 'itms-apps://https://apps.apple.com/us/app/tds-app/id6499496237';
      if(this.iosServerVersion !== currentVersion) {
        this.forceUpdate = true;
      } else {
        this.forceUpdate = false;
      }
    }
  }

  async ionViewWillEnter() {
    const token = await this.storage.get('token');
    if(token && !this.forceUpdate) {
      this.splashMode = true;
    } else {
      this.splashMode = false;
      const showEventPopup = this.sysParamServ.getValue('SHOW_EVENT_SPLASH') as string;
      if(showEventPopup === 'Y') {
          this.globalService.eventScreenShowed = true;
          setTimeout(async () => {
            const modalEl = await this.modalController.create({
              component: FullScreenModalComponent,
              cssClass: 'gallery-full-modal',
              componentProps: {
                url: 'images/event.png',
                type: 'img'
              },
              backdropDismiss: true
            });
            return await modalEl.present();
          }, 3100)


      }
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


  async forceUpdateLogic() {
    if(this.forceUpdate) {
      await this.market.open(this.appId);
    }
  }
}

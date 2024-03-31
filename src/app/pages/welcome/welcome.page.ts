import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductFullGalleryModalComponent } from 'src/app/components/product-full-gallery-modal/product-full-gallery-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { SystemParametersService } from 'src/app/services/system-parameters.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  splashMode : boolean = false;
  constructor(private router: Router, private storage: SecureStorage, private notificationService: NotificationService, private sysParamServ: SystemParametersService,
    private modalController: ModalController) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    const token = await this.storage.get('token');
    if(token) {
      this.splashMode = true;
    } else {
      this.splashMode = false;
      const showEventPopup = this.sysParamServ.getValue('SHOW_EVENT_SPLASH') as string;
      if(showEventPopup === 'Y') {
          setTimeout(async () => {
            const modalEl = await this.modalController.create({
              component: ProductFullGalleryModalComponent,
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
}

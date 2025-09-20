import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountImageModalComponent } from 'src/app/components/account-image-modal/account-image-modal.component';
import { UserModel } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  photoURL: string = '';

  user!: UserModel;

  mode: string = '';

  openImageModal = false;
  isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'View Image',
      data: {
        action: 'view',
      },
    },
    {
      text: 'Change Image',
      data: {
        action: 'change',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];



  constructor( private storage: SecureStorage,
    private modalController: ModalController,
    private profileService: ProfileService,
    private router: Router,
    private notificationService: NotificationService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    this.mode = await this.storage.get('mode');
    this.user = await this.storage.get('user') as UserModel;
    this.photoURL = await this.storage.get('photo');
    console.log('iside init', this.photoURL);
    if(!this.photoURL) this.photoURL = 'assets/default-profile.png';
    console.log('iside init after check', this.photoURL);
  }

  async ionViewDidEnter() {
    this.mode = await this.storage.get('mode');
    this.profileService.userUpdated.subscribe({
      next: async () => this.user = await this.storage.get('user') as UserModel
    })
  }

  async ionViewWillEnter() {
    console.log('inside ionViewWillEnter')
    this.mode = await this.storage.get('mode');
    this.user = await this.storage.get('user') as UserModel;
  }

  openImagePicker() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
    // this.camera.getPicture(options).then(async (imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   this.photoURL = 'data:image/jpeg;base64,'  + imageData;
    //   console.log(this.photoURL);
    //   await this.storage.set('photo', this.photoURL);
    // }, (err) => {
    //   // Handle error
    //   console.log(err);

    // });


    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          this.photoURL = reader.result as string; // Base64 Image Data
         // console.log(this.photoURL);
          await this.storage.set('photo', this.photoURL);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
 }

  setOpenOfActionSheet(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  async openImageViewer() {
    const modal = await this.modalController.create({
      component: AccountImageModalComponent,
      cssClass: 'image-modal',
      componentProps: {
        photoURL: this.photoURL
      }
    });
    return await modal.present();
  }

  onActionSheetDismiss(event: any) {
    this.setOpenOfActionSheet(false);
    console.log(event.detail.data.action);
    if(event.detail.data.action === 'change') {
      this.openImagePicker();
    } else if(event.detail.data.action === 'view') {
      this.openImageViewer();
    }
  }

  async logout() {
    await this.storage.set('notifToken', undefined);
    this.notificationService.setNotificationToken(null).subscribe();
    await this.storage.set('user', undefined);
    await this.storage.set('mode', 'guest')
    await this.storage.set('token', undefined);
    this.cartService.emptyTheCart();
    this.router.navigateByUrl('/welcome');
  }

}

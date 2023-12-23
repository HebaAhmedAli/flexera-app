import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ModalController } from '@ionic/angular';
import { AccountImageModalComponent } from 'src/app/components/account-image-modal/account-image-modal.component';
import { UserModel } from 'src/app/models/user.model';
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



  constructor(private camera: Camera, private storage: SecureStorage,
    private modalController: ModalController,
    private profileService: ProfileService,
    private router: Router
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
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.photoURL = 'data:image/jpeg;base64,'  + imageData;
      console.log(this.photoURL);
      await this.storage.set('photo', this.photoURL);
    }, (err) => {
      // Handle error
      console.log(err);

    });
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
    await this.storage.set('user', undefined);
    await this.storage.set('mode', 'guest')
    await this.storage.set('token', undefined);
    this.router.navigateByUrl('/welcome');
  }

}

import { Component, OnInit } from '@angular/core';
 import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  photoURL: string = '';

  constructor(private camera: Camera, private storage: SecureStorage
  ) {}

  async ngOnInit() {
    this.photoURL = await this.storage.get('photo');
    console.log('iside init', this.photoURL);
    if(!this.photoURL) this.photoURL = 'assets/default-profile.png';
    console.log('iside init after check', this.photoURL);
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



}

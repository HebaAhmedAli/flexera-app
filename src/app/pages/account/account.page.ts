import { Component, OnInit } from '@angular/core';
 import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  photoURL: string = 'assets/default-profile.png';

  constructor(private camera: Camera
  ) {}

  ngOnInit() {
  }

  openImagePicker() {
    // this.imagePicker.hasReadPermission().then((permission) => {
    //   if (permission) {
    //     this.imagePicker.getPictures({ maximumImagesCount: 1 }).then((results) => {
    //       if (results && results.length) {
    //         this.photoURL = 'data:image/jpeg;base64,' + results[0];
    //       }
    //     });
    //   } else {
    //     this.imagePicker.requestReadPermission();
    //   }
    // });

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log(imageData);
      this.photoURL = 'data:image/jpeg;base64,'  + imageData;
    }, (err) => {
      // Handle error
      console.log(err);

    });
 }



}

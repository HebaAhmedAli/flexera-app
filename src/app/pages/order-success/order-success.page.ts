import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage implements OnInit {

  @ViewChild('uploadInput', { static: true }) myUploadInput!: ElementRef<HTMLInputElement>;
  done = false;

  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  constructor(private httpClient: HttpClient, public router: Router) { }

  ngOnInit() {
  }

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post(`${environment.baseUrl}/api/v1/image/upload`, uploadImageData, { observe: 'response' })
      .subscribe((response: any) => {
        console.log(response)
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
          this.done = true;
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get(`${environment.baseUrl}/api/v1/image/get` + this.imageName)
      .subscribe(
        (        res: any) => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  actionButtonClick() {
    !this.done ? this.myUploadInput.nativeElement.click() :this. router.navigateByUrl('/tabs/home');
  }

}

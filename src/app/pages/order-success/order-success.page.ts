import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  orderId!: string;
  orderStatus!: String;

  text = 'Please Upload a screenshot from the payment receipt to complete your order';

  constructor(private httpClient: HttpClient, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.orderId = params.orderId as string;
        this.orderStatus = params.orderStatus as string;
        this.done = this.orderStatus === 'Incomplete' ? false : true;
    });

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
    uploadImageData.append('orderId', this.orderId);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post(`${environment.baseUrl}/api/v1/upload-receipt`, uploadImageData, { observe: 'response' })
      .subscribe((response: any) => {
        console.log(response)
        if (response.status === 200) {
          this.text = 'Image uploaded successfully!';
          this.message = 'Image uploaded successfully';
          this.done = true;
        } else {
          this.text = 'Image not uploaded successfully, please try again!';
          this.message = 'Image not uploaded successfully';
        }
      }, err => {
        console.log(err);
        this.text = 'Image not uploaded successfully, please try again!';
      }
      );
  }


  actionButtonClick() {
    !this.done ? this.myUploadInput.nativeElement.click() :this. router.navigateByUrl('/tabs/home');
  }

}

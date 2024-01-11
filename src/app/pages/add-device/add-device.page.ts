import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { DeviceService } from 'src/app/services/device.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  @ViewChild('receiptInput', { static: true }) receiptInput!: ElementRef<HTMLInputElement>;
  @ViewChild('stickerInput', { static: true }) stickerInput!: ElementRef<HTMLInputElement>;

  receiptFile!: File;
  stickerFile!: File;

  product!: ProductModel;


  message!: String;
  isAlertOpen = false;
  status!: number;

  products: ProductModel[] = [];

  constructor(private deviceService: DeviceService, private router: Router, private productService: ProductService) { }

  ngOnInit() {

    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);

    },
    err => {
      console.log(err);
    });
  }

  addTheDevice(): void {

    const addDeviceData = new FormData();
    addDeviceData.append('receiptFile', this.receiptFile, this.receiptFile.name);
    addDeviceData.append('stickerFile', this.stickerFile, this.stickerFile.name);


    addDeviceData.append('productId', String(this.product.id));

    this.deviceService.addNewDevice(addDeviceData).subscribe(async (response: any) => {
      console.log(response);
      this.status = response.status;
      if(response.status === 200) {
        this.message = 'Your request will be revised and you will be notified in 48 hours.';
        this.isAlertOpen = true;
      } else {
        this.message = response.error.message;
        this.isAlertOpen = true;
      }
    }, error => {
      console.log(error)
      this.message = error.error.message;
      this.isAlertOpen = true;
    }
    );

  }

  public onReceiptFileChanged(event: any) {
    //Select File
    this.receiptFile = event.target.files[0];
    console.log('inside onReceiptFileChanged', this.receiptFile)
  }

  public onStickerFileChanged(event: any) {
    //Select File
    this.stickerFile = event.target.files[0];
  }

  actionButtonClick(type: string) {
    if(type === 'receipt') {
      console.log('actionButtonClick')
      this.receiptInput.nativeElement.click();
    } else {
      this.stickerInput.nativeElement.click();
    }
  }


  async alertDismiss() {
    this.isAlertOpen = false;
    if(this.status === 200) {
      this.router.navigate(['/my-devices']);
    }
  }
}

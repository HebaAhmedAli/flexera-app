import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  segmentValue = 'current';
  mode = '';
  selectedFile!: File;

  currentOrders! : OrderModel[];

  oldOrders!: OrderModel[];

  allOrders: OrderModel[] = [];

  @ViewChild('myUploadInput', { static: true }) myUploadInput!: ElementRef<HTMLInputElement>;
  currentOrderToAttach!: OrderModel;

  isActionSheetOpen = false;

  orderToDelete!: OrderModel;

  public actionSheetButtons = [
    {
      text: 'Confirm Delete The Order',
      data: {
        action: 'delete',
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

  constructor(private storage: SecureStorage, private orderService: OrderService, private httpClient: HttpClient) { }

  async ngOnInit() {
    this.mode = await this.storage.get('mode');

  }




  async ionViewWillEnter() {
    this.mode = await this.storage.get('mode');
    if(this.mode === 'user') {
      this.getOrders();
    }

  }

  getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.allOrders = data;
      this.oldOrders = this.allOrders.filter(order => order.status === 'Done');
      this.currentOrders = this.allOrders.filter(order => order.status !== 'Done');

    },
    err => {
      console.log(err);
    })
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
    uploadImageData.append('orderId', String(this.currentOrderToAttach.id));

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post(`${environment.baseUrl}/api/v1/upload-receipt`, uploadImageData, { observe: 'response' })
      .subscribe((response: any) => {
        console.log(response)
        if (response.status === 200) {
          const index = this.allOrders.findIndex(order => order.id === this.currentOrderToAttach.id);
          this.allOrders[index].status = 'Pending';
          this.oldOrders = this.allOrders.filter(order => order.status === 'Done');
          this.currentOrders = this.allOrders.filter(order => order.status !== 'Done');

        } else {
          alert('Image not uploaded successfully');
        }
      }
      );
  }


  actionButtonClick(order: OrderModel) {
    this.currentOrderToAttach = order;
    this.myUploadInput.nativeElement.click();
  }

  onActionSheetDismiss(event: any) {
    this.isActionSheetOpen = false;
    if(event.detail.data.action === 'delete') {
      this.deleteOrder();
    }
  }

  openActionSheet(order: OrderModel) {
    this.isActionSheetOpen = true;
    this.orderToDelete = order;
  }

  deleteOrder() {
    console.log(this.orderToDelete);
    this.orderService.deleteOrder(this.orderToDelete.id).subscribe(response => {
      console.log(response, response.status)
      if (response.status === 200) {

        this.getOrders();
      }
    },
    err => {
      console.log(err);
    })
  }
}

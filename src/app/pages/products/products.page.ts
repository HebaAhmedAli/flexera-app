import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  segmentValue: string = 'devices';

  devicesProducts : any[]= [];
  materialsProducts :  any[] = [];
  constructor() { }

  ngOnInit() {
    this.devicesProducts = [
      {
        name: 'Hyper Light',
        price: '1000 EGP',
        description: 'Premium x-Ray.',
        img: 'assets/products/hyper-light.jpeg'

      },
      {
        name: 'Nano pix',
        price: '2000 EGP',
        description: 'Premium x-Ray Premium x-Ray...',
        img: 'assets/products/nano-pix.jpeg'

      },
      {
        name: 'Nano pix',
        price: '2000 EGP',
        description: 'The Description Description of...',
        img: 'assets/products/nano-pix.jpeg'

      },
      {
        name: 'Hyper Light',
        price: '1000 EGP',
        description: 'The Description of the Hyper...',
        img: 'assets/products/hyper-light.jpeg'

      }
    ];

    this.materialsProducts = [
      {
        name: 'Material Device',
        price: '1000 EGP',
        description: 'Premium x-Ray.',
        img: 'assets/products/material-device.jpeg'

      },
      {
        name: 'Digital Device',
        price: '2000 EGP',
        description: 'Premium x-Ray Premium x-Ray...',
        img: 'assets/products/digital-device.jpeg'

      },
      {
        name: 'Material Device',
        price: '2000 EGP',
        description: 'The Description Description of...',
        img: 'assets/products/material-device.jpeg'

      },
      {
        name: 'Digital Device',
        price: '1000 EGP',
        description: 'The Description of the Hyper...',
        img: 'assets/products/digital-device.jpeg'

      }
    ];
  }

}

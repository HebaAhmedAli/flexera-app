import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {


  segmentValue: string = 'devices';
  selectedSortBy: number = 0;
  categoryImg: string = '';
  categoryId: number = 0;
  devicesProducts : any[]= [];
  materialsProducts :  any[] = [];
  constructor(private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.categoryImg = this.router.snapshot.paramMap.get('categoryImg') as string;
    this.categoryId = Number(this.router.snapshot.paramMap.get('categoryId') as string);

    this.devicesProducts = [
      {
        name: 'Hyper Light',
        price: 1000,
        description: 'Portable X-Ray Unit...',
        img: 'assets/products/hyper-light.jpeg'

      },
      {
        name: 'Nano pix',
        price: 2000,
        description: 'Premium x-Ray Premium x-Ray...',
        img: 'assets/products/nano-pix.jpeg'

      },
      {
        name: 'Nano pix',
        price: 2000,
        description: 'The Description Description of...',
        img: 'assets/products/nano-pix.jpeg'

      },
      {
        name: 'Hyper Light',
        price: 1000,
        description: 'The Description of the Hyper...',
        img: 'assets/products/hyper-light.jpeg'

      },
      {
        name: 'Hyper Light',
        price: 1000,
        description: 'The Description of the Hyper...',
        img: 'assets/products/hyper-light.jpeg'

      }
    ];

    this.materialsProducts = [
      {
        name: 'Material Device',
        price: 1000,
        description: 'Premium x-Ray.',
        img: 'assets/products/material-device.jpeg'

      },
      {
        name: 'Digital Device',
        price: 2000,
        description: 'Premium x-Ray Premium x-Ray...',
        img: 'assets/products/digital-device.jpeg'

      },
      {
        name: 'Material Device',
        price: 2000,
        description: 'The Description Description of...',
        img: 'assets/products/material-device.jpeg'

      },
      {
        name: 'Digital Device',
        price: 1000,
        description: 'The Description of the Hyper...',
        img: 'assets/products/digital-device.jpeg'

      }
    ];
  }

  changeSelectedSortBy(selectedNumber: number, modal: any) {
    this.selectedSortBy = selectedNumber;
    modal.dismiss();
  }
}

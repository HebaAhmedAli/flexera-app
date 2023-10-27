import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public categories: any = [];
  public featuredProducts: any = [];
  public bestSellProducts: any = [];

  constructor(
  ) { }

  ngOnInit() {

  }


}

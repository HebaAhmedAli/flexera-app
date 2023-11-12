import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  segmentValue = 'current';

  currentOrders = [{no: '#22345', price: 1000, expanded: true} , {no: '#222222', price: 2000, expanded: false}, {no: '#221111', price: 1000, expanded: false},
  {no: '#22333', price: 1000, expanded: false}, {no: '212444', price: 3000, expanded: false}];

  oldOrders = [{no: '#12345', price: 1000, expanded: false} , {no: '#122222', price: 3000, expanded: false}, {no: '#121111', price: 1000, expanded: false},
  {no: '#12333', price: 1000, expanded: false}, {no: '#12444', price: 2000, expanded: false}];
  constructor() { }

  ngOnInit() {
  }

}

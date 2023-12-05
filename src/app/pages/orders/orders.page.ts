import { Component, OnInit } from '@angular/core';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  segmentValue = 'current';
  mode = '';
  currentOrders = [{no: '#22345', price: 1000, expanded: true, status: 'Pending'} , {no: '#222222', price: 2000, expanded: false, status: 'In Process'}, {no: '#221111', price: 1000, expanded: false, status: 'In Process'},
  {no: '#22333', price: 1000, expanded: false, status: 'Pending'}, {no: '212444', price: 3000, expanded: false, status: 'Pending'}];

  oldOrders = [{no: '#12345', price: 1000, expanded: false, status: 'Done'} , {no: '#122222', price: 3000, expanded: false, status: 'Done'}, {no: '#121111', price: 1000, expanded: false, status: 'Done'},
  {no: '#12333', price: 1000, expanded: false, status: 'Done'}, {no: '#12444', price: 2000, expanded: false, status: 'Done'}];
  constructor(private storage: SecureStorage) { }

  async ngOnInit() {
    this.mode = await this.storage.get('mode');

  }

  async ionViewDidEnter() {
    this.mode = await this.storage.get('mode');

  }

}

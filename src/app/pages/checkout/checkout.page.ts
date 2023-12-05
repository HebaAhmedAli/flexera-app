import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  paymentMethod = 'cash';
  address = 'Elshrok street esmail serry';
  editAddress = false;
  order = {no: '#22345', price: 1000, status: 'Pending'};

  constructor() { }

  ngOnInit() {
  }

}

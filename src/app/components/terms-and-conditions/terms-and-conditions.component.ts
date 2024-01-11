import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent  implements OnInit {

  constructor(private modalController: ModalController, private http: HttpClient) { }

  termsAndConditions='';
  ngOnInit() {
    this.http.get('assets/html/terms-and-conditions.html', {responseType: 'text'}).subscribe(data => {
      this.termsAndConditions = data;
     });
  }

  dismiss() {
    this.modalController.dismiss();
  }

}

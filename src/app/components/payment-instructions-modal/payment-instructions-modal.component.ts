import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-instructions-modal',
  templateUrl: './payment-instructions-modal.component.html',
  styleUrls: ['./payment-instructions-modal.component.scss'],
})
export class PaymentInstructionsModalComponent  implements OnInit {

  @Input() paymentMethod?: string;
  @Input() totalPrice?: string;

  number = '011334499559';
  title = '';
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {

    switch(this.paymentMethod) {
      case 'instapay':
        this.title = 'Pay via InstaPay';
        break;
      case 'vodafone-cash':
        this.title = 'Pay via Voafone Cash';
        break;
      case 'etisalat-cash':
        this.title = 'Pay via Etisalat Cash';
    }

  }

  dismiss() {
    this.modalController.dismiss();
  }

}

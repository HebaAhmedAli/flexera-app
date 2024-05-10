import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SystemParametersService } from 'src/app/services/system-parameters.service';

@Component({
  selector: 'app-payment-instructions-modal',
  templateUrl: './payment-instructions-modal.component.html',
  styleUrls: ['./payment-instructions-modal.component.scss'],
})
export class PaymentInstructionsModalComponent  implements OnInit {

  @Input() paymentMethod?: string;
  @Input() totalPrice?: string;

  number = '';
  title = '';

  constructor(private modalController: ModalController, private sysParamServ: SystemParametersService) { }

  ngOnInit() {


    switch(this.paymentMethod) {
      case 'instapay':
        this.title = 'Pay via InstaPay';
        this.number = this.sysParamServ.getValue('INSTAPAY') as string;
        break;
      case 'vodafone-cash':
        this.title = 'Pay via Voafone Cash';
        this.number = this.sysParamServ.getValue('VODAFONE-CASH') as string;
        break;
      case 'etisalat-cash':
        this.title = 'Pay via Etisalat Cash';
        this.number = this.sysParamServ.getValue('ETISALAT-CASH') as string;
    }

  }

  dismiss() {
    this.modalController.dismiss();
  }

}

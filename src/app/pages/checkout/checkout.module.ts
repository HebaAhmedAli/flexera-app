import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { SharedModule } from 'src/app/shared.module';
import { PaymentInstructionsModalComponent } from 'src/app/components/payment-instructions-modal/payment-instructions-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    SharedModule
  ],
  declarations: [CheckoutPage, PaymentInstructionsModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutPageModule {}

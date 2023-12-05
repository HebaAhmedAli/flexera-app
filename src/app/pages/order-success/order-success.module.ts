import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSuccessPageRoutingModule } from './order-success-routing.module';

import { OrderSuccessPage } from './order-success.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSuccessPageRoutingModule,
    SharedModule
  ],
  declarations: [OrderSuccessPage]
})
export class OrderSuccessPageModule {}

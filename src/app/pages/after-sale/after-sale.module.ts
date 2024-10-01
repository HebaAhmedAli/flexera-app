import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfterSalePageRoutingModule } from './after-sale-routing.module';

import { AfterSalePage } from './after-sale.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfterSalePageRoutingModule,
    SharedModule
  ],
  declarations: [AfterSalePage]
})
export class AfterSalePageModule {}

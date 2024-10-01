import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenenceRequestPageRoutingModule } from './maintenence-request-routing.module';

import { MaintenenceRequestPage } from './maintenence-request.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenenceRequestPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [MaintenenceRequestPage]
})
export class MaintenenceRequestPageModule {}

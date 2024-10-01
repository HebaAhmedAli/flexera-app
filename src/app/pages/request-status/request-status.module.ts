import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestStatusPageRoutingModule } from './request-status-routing.module';

import { RequestStatusPage } from './request-status.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestStatusPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [RequestStatusPage]
})
export class RequestStatusPageModule {}

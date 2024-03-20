import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitComplaintPageRoutingModule } from './submit-complaint-routing.module';

import { SubmitComplaintPage } from './submit-complaint.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    SubmitComplaintPageRoutingModule
  ],
  declarations: [SubmitComplaintPage]
})
export class SubmitComplaintPageModule {}

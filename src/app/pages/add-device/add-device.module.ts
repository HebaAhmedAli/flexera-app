import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDevicePageRoutingModule } from './add-device-routing.module';

import { AddDevicePage } from './add-device.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDevicePageRoutingModule,
    SharedModule
  ],
  declarations: [AddDevicePage]
})
export class AddDevicePageModule {}

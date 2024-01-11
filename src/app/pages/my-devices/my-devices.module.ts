import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDevicesPageRoutingModule } from './my-devices-routing.module';

import { MyDevicesPage } from './my-devices.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyDevicesPageRoutingModule
  ],
  declarations: [MyDevicesPage]
})
export class MyDevicesPageModule {}

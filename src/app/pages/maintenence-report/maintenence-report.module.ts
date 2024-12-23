import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenenceReportPageRoutingModule } from './maintenence-report-routing.module';

import { MaintenenceReportPage } from './maintenence-report.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenenceReportPageRoutingModule,
    SharedModule
  ],
  declarations: [MaintenenceReportPage]
})
export class MaintenenceReportPageModule {}

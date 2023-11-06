import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademyPageRoutingModule } from './academy-routing.module';

import { AcademyPage } from './academy.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcademyPageRoutingModule,
    SharedModule
  ],
  declarations: [AcademyPage]
})
export class AcademyPageModule {}

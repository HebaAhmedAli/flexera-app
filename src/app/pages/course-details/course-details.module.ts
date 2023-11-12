import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseDetailsPageRoutingModule } from './course-details-routing.module';

import { CourseDetailsPage } from './course-details.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [CourseDetailsPage]
})
export class CourseDetailsPageModule {}

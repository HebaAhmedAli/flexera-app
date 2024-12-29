import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookCoursePageRoutingModule } from './book-course-routing.module';

import { BookCoursePage } from './book-course.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookCoursePageRoutingModule,
    SharedModule
  ],
  declarations: [BookCoursePage]
})
export class BookCoursePageModule {}

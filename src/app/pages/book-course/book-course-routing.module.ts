import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookCoursePage } from './book-course.page';

const routes: Routes = [
  {
    path: '',
    component: BookCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCoursePageRoutingModule {}

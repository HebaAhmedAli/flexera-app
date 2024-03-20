import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitComplaintPage } from './submit-complaint.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitComplaintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitComplaintPageRoutingModule {}

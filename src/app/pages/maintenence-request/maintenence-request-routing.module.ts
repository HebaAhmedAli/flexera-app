import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenenceRequestPage } from './maintenence-request.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenenceRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenenceRequestPageRoutingModule {}

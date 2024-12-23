import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenenceReportPage } from './maintenence-report.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenenceReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenenceReportPageRoutingModule {}

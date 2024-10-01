import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterSalePage } from './after-sale.page';

const routes: Routes = [
  {
    path: '',
    component: AfterSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfterSalePageRoutingModule {}

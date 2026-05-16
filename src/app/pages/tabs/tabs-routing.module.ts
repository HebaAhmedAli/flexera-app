import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'after-sale',
        loadChildren: () => import('../after-sale/after-sale.module').then(m => m.AfterSalePageModule)
      },
      {
        path: 'academy',
        loadChildren: () => import('../academy/academy.module').then( m => m.AcademyPageModule)
      },
      {
        path: 'marketplace',
        loadChildren: () => import('../marketplace/marketplace.module').then( m => m.MarketplacePageModule)
      },
       {
        path: 'profile',
        loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'support',
        loadChildren: () => import('../support/support.module').then( m => m.SupportPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

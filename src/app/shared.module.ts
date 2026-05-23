import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AccountImageModalComponent } from './components/account-image-modal/account-image-modal.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ProductFullGalleryModalComponent } from './components/product-full-gallery-modal/product-full-gallery-modal.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { PinchZoomModule } from '@mapaxe/ngx-pinch-zoom';
import { SafePipe } from './pipes/safe.pipe';
import { FullScreenModalComponent } from './components/full-screen-modal/full-screen-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AccountImageModalComponent,
    ProductFullGalleryModalComponent,
    ProductCardComponent,
    SafeHtmlPipe,
    SafePipe,
    FullScreenModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    PinchZoomModule
    ],
  exports: [
    HeaderComponent,
    AccountImageModalComponent,
    ProductFullGalleryModalComponent,
    ProductCardComponent,
    SafeHtmlPipe,
    SafePipe,
    FullScreenModalComponent
  ]
})
export class SharedModule {}

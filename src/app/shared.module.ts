import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { AccountImageModalComponent } from './components/account-image-modal/account-image-modal.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ProductFullGalleryModalComponent } from './components/product-full-gallery-modal/product-full-gallery-modal.component';

import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    AccountImageModalComponent,
    ProductFullGalleryModalComponent,
    SafeHtmlPipe,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PinchZoomModule
    ],
  exports: [
    HeaderComponent,
    AccountImageModalComponent,
    ProductFullGalleryModalComponent,
    SafeHtmlPipe,
    SafePipe
  ]
})
export class SharedModule {}

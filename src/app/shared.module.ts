import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { AccountImageModalComponent } from './components/account-image-modal/account-image-modal.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    AccountImageModalComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    AccountImageModalComponent,
    SafeHtmlPipe
  ]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { AccountImageModalComponent } from './components/account-image-modal/account-image-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AccountImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    AccountImageModalComponent
  ]
})
export class SharedModule {}

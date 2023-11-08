import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-account-image-modal',
  templateUrl: './account-image-modal.component.html',
  styleUrls: ['./account-image-modal.component.scss'],
})
export class AccountImageModalComponent  implements OnInit {

  @Input()
  photoURL!: string;

  constructor(public modal: ModalController) { }

  ngOnInit() {
    console.log(this.photoURL);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-full-gallery-modal',
  templateUrl: './product-full-gallery-modal.component.html',
  styleUrls: ['./product-full-gallery-modal.component.scss'],
})
export class ProductFullGalleryModalComponent  implements OnInit {


  @Input()
  url!: string;

  @Input()
  type!: string;
  private backbuttonSubscription!: Subscription;

constructor(private modalCtrl: ModalController) {}

ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {
        const modal = await this.modalCtrl.getTop();
        if (modal) {
            modal.dismiss();
        }
    });
}

ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
}

getImgUrl(url: string): string {
  return environment.baseUrl + '/' + url;
 }
}

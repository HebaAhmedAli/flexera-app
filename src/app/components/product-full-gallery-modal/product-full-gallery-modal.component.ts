import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { GalleryItem } from 'src/app/models/gallery-item.model';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';


@Component({
  selector: 'app-product-full-gallery-modal',
  templateUrl: './product-full-gallery-modal.component.html',
  styleUrls: ['./product-full-gallery-modal.component.scss'],
})
export class ProductFullGalleryModalComponent  implements OnInit {

  gallerySwiper!: Swiper;
  @Input()
  gallery!: GalleryItem[];

  @Input()
  i!: number;

  activeIndex = 0;

  index = this.i ;

  private backbuttonSubscription!: Subscription;

  private touchStartX: number = 0;
  private touchEndX: number = 0;




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

ngAfterViewInit() {

  this.gallerySwiper = new Swiper('.gallery-swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    on: {
      slideChange: () => {
        // Arrow function keeps the outer `this`
        this.activeIndex = this.gallerySwiper.activeIndex;
        console.log('Active Slide Index:', this.gallerySwiper.activeIndex);
      },
    },
  });
  console.log(this.gallerySwiper)
  this.gallerySwiper.slideTo(this.index);
}

ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
}


// onTouchStart(event: TouchEvent) {
//   this.touchStartX = event.changedTouches[0].screenX;
// }

// onTouchEnd(event: TouchEvent) {
//   this.touchEndX = event.changedTouches[0].screenX;
//   this.handleSwipe();
// }

// handleSwipe() {
//   const deltaX = this.touchEndX - this.touchStartX;

//   if (deltaX > 50) {
//      this.decreaseIndex();
//      console.log('Swiped Right');

//   } else if (deltaX < -50) {
//     this.increaseIndex();
//     console.log('Swiped Left');

//   }
// }

get url(): string {
 return this.gallery[this.index]?.url;
}

get type(): string {
  return this.gallery[this.index]?.type;
 }

 decreaseIndex() {
  if(this.index - 1 < 0) return;
  this.index -= 1;
 }

 increaseIndex() {
  if(this.index + 1 === this.gallery.length) return;
  this.index += 1;
 }
}

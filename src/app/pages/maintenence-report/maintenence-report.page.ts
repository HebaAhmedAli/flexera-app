import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { ProductFullGalleryModalComponent } from 'src/app/components/product-full-gallery-modal/product-full-gallery-modal.component';
import { GalleryItem } from 'src/app/models/gallery-item.model';
import { Maintenece } from 'src/app/models/maintenence.model';
import { MainteneceService } from 'src/app/services/maintenece.service';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';

@Component({
  selector: 'app-maintenence-report',
  templateUrl: './maintenence-report.page.html',
  styleUrls: ['./maintenence-report.page.scss'],
})
export class MaintenenceReportPage implements OnInit {

  requestNo!: number;
  phone!: string;
  maintenence!: Maintenece;
  maintSwiper!: Swiper;

  videoFixed = false;
  justClickSegment = false;

  constructor(private route: ActivatedRoute, private maintenenceService: MainteneceService, private platform: Platform, private modalController: ModalController) { }

  ngOnInit() {
    this.requestNo = Number(this.route.snapshot.paramMap.get('requestNo') as string);
    this.phone = this.route.snapshot.paramMap.get('phone') as string;

    this.maintenenceService.getMaintenece(this.requestNo,this.phone ).subscribe(main => {
      this.maintenence = main;
      this.videoFix();
    }, err => {
      console.log('Error retrieving maintenence (wrong request number or phone).');
    });
  }


  ionViewDidEnter() {

    this.maintSwiper = new Swiper('.maint-swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
    });
    this.videoFix();

  }


 videoFix() {
  if(this.platform.is("ios")) return;
  if(this.videoFixed) return;
  this.maintenence?.gallery?.forEach(main => {
    if(main.type === 'video') {
      var video = (document.getElementById(('main_video' + String(main.id))) as HTMLVideoElement);
      if(!video) {
        setTimeout(() => {
          this.videoFix();
        }, 100);
        return;
      }
      this.videoFixed = true;
      video.muted = true;
      video.play().then(() => {
        console.log('inside play');
        video.pause();
        video.muted = false;
      },
      err => {
        console.log('err ', err);
      }).catch(err => {
        console.log('err ', err);
      });

    }
  })
 }



  getImgUrl(url: string): string {
    return environment.baseUrl + '/' + url;
   }


   async openImageViewer(i: number) {
    if(this.justClickSegment) return;
    let galleryList: GalleryItem[] = [];

    this.maintenence?.gallery?.forEach(main => {
      let gallery = new GalleryItem();
      gallery.type = main.type;
      gallery.url = main.url;
      galleryList.push(gallery);
    });

    const modalEl = await this.modalController.create({
      component: ProductFullGalleryModalComponent,
      cssClass: 'gallery-full-modal',
      componentProps: {
        gallery: galleryList,
        index: i
      },
      backdropDismiss: true
    });
    return await modalEl.present();
  }

}

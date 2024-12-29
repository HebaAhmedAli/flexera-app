import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProductFullGalleryModalComponent } from 'src/app/components/product-full-gallery-modal/product-full-gallery-modal.component';
import { CourseBooking } from 'src/app/models/course-booking.model';
import { Course } from 'src/app/models/course.model';
import { GalleryItem } from 'src/app/models/gallery-item.model';
import { AcademyService } from 'src/app/services/academy.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { environment } from 'src/environments/environment';
import Swiper from 'swiper';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit, OnDestroy {

  course?: Course;
  subscriptions: Subscription[] = [];
  loading = true;
  image?: string;
  swiper!: Swiper;
  isModalOpen = false;

  videoFixed = false;
  mode!: string;
  myCourses:  CourseBooking[] = [];

  constructor(private storage: SecureStorage, private academyService: AcademyService, private activatedRoute: ActivatedRoute, private platform: Platform, private modalController: ModalController) { }

  async ngOnInit() {
    this.mode = await this.storage.get('mode');

    const courseId = Number(this.activatedRoute.snapshot.paramMap.get('course_id') as string);
    if(courseId) {
      this.getCourseDetails(courseId);
    }

    this.academyService.getMyCourses().subscribe(courseBookings => {
      this.myCourses = courseBookings;
    });
  }

  getCourseDetails(courseId: number) {
    this.academyService.getCourseById(courseId)
    .subscribe(course => {
      this.course = course;
       this.loading = false;
       this.videoFix();

      // this.image = `${environment.baseUrl}/${course.image}`
      }),
    () => {this.loading = false}
  }


  ionViewDidEnter() {
    this.swiper = new Swiper('.course-swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    this.videoFix();
 }


 videoFix() {
  if(this.platform.is("ios")) return;
  if(this.videoFixed) return;
  this.course?.gallery.forEach(gallery => {
    if(gallery.type === 'video') {
      var video = (document.getElementById(('course-video' + String(gallery.id))) as HTMLVideoElement);
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



 async openImageViewer(galleryItem: GalleryItem, i: number) {


   const modalEl = await this.modalController.create({
     component: ProductFullGalleryModalComponent,
     cssClass: 'gallery-full-modal',
     componentProps: {
       gallery: this.course?.gallery,
       index: i
     },
     backdropDismiss: true
   });
   return await modalEl.present();
 }




  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get alreadyBooked() {
    return this.myCourses?.find(courseBooking =>  courseBooking.course.id === this.course?.id) != undefined;
  }

}

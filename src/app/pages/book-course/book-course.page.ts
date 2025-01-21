import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PaymentInstructionsModalComponent } from 'src/app/components/payment-instructions-modal/payment-instructions-modal.component';
import { CourseBookingRq } from 'src/app/models/course-booking-rq.model';
import { CourseBooking } from 'src/app/models/course-booking.model';
import { Course } from 'src/app/models/course.model';
import { AcademyService } from 'src/app/services/academy.service';
import { SystemParametersService } from 'src/app/services/system-parameters.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-course',
  templateUrl: './book-course.page.html',
  styleUrls: ['./book-course.page.scss'],
})
export class BookCoursePage implements OnInit {
  @ViewChild('uploadRInput') myUploadRInput!: ElementRef<HTMLInputElement>;
  @ViewChild('uploadIdInput') myUploadIdInput!: ElementRef<HTMLInputElement>;
  paymentMethod = 'instapay';

  course!: Course;

  receiptDone = false;
  idDone = false;


  selectedRFile!: File;
  selectedIdFile!: File;

  message!: string;
  courseId!: number;
  isAlertOpen = false;

  loading = false;


  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private academyService: AcademyService, private modalController: ModalController, private sysParamServ: SystemParametersService) { }

  ngOnInit() {
    this.courseId = Number(this.activatedRoute.snapshot.paramMap.get('course_id') as string);
    if(this.courseId) {
      this.getCourseDetails(this.courseId);
    }


  }

  getCourseDetails(courseId: number) {
    this.academyService.getCourseById(courseId)
    .subscribe(course => {
      this.course = course;

      }),
    () => {}
  }

    async openPaymentInstructionsModal(paymentMethod: string) {
      let totalPrice = this.course.price;
      switch(paymentMethod) {
        case 'instapay':
          totalPrice = totalPrice + Number(this.sysParamServ.getValue('instapay-perc')) * totalPrice / 100.0;
          break;
        case 'vodafone-cash':
          totalPrice = totalPrice + Number(this.sysParamServ.getValue('vodafone-cash-perc')) * totalPrice / 100.0;
          break;
        case 'etisalat-cash':
          totalPrice = totalPrice + Number(this.sysParamServ.getValue('etisalat-cash-perc')) * totalPrice / 100.0;
          break;
      }
      const modal = await this.modalController.create({
        component: PaymentInstructionsModalComponent,
        cssClass: 'payment-modal',
        componentProps: {
          paymentMethod,
          totalPrice: totalPrice
        }
      });
      return await modal.present();
    }


  //Gets called when the user selects an image
    public onFileChanged(event: any, type: string) {
      //Select File
      if(type === 'receipt')
       {
        this.receiptDone = true;
        this.selectedRFile = event.target.files[0];
       }
      else
      {
        this.idDone = true;
      this.selectedIdFile = event.target.files[0];
      }

      // this.onUpload();
    }

    bookCourse() {
      this.loading = true;

      let courseBookingRq = new CourseBookingRq();
      let totalPrice = this.course.price;
      switch(this.paymentMethod) {
        case 'instapay':
          totalPrice = totalPrice + Number(this.sysParamServ.getValue('instapay-perc')) * totalPrice / 100.0;
          break;
        case 'vodafone-cash':
          totalPrice = totalPrice + Number(this.sysParamServ.getValue('vodafone-cash-perc')) * totalPrice / 100.0;
          break;
        case 'etisalat-cash':
          totalPrice = totalPrice + Number(this.sysParamServ.getValue('etisalat-cash-perc')) * totalPrice / 100.0;
          break;
      }
      courseBookingRq.courseId = this.courseId;
      courseBookingRq.paymentMethod = this.paymentMethod;
      courseBookingRq.price = totalPrice;
       this.academyService.bookCourse(courseBookingRq).subscribe(async (response: any) => {
            console.log(response);
            if(response.status === 200) {
              this.onUpload(response.body.id);
            } else {
              this.loading = false;
              this.message = response.error.message;
              this.isAlertOpen = true;
            }
          }, error => {
            console.log(error)
            this.message = error.error.message;
            this.isAlertOpen = true;
            this.loading = false;
          }
          );
    }

    //Gets called when the user clicks on submit to upload the image
    onUpload(id: number) {

      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('receipt', this.selectedRFile, this.selectedRFile.name);
      uploadImageData.append('cardId', this.selectedIdFile, this.selectedIdFile.name);
      uploadImageData.append('courseBookingId', String(id));

      //Make a call to the Spring Boot Application to save the image
      this.httpClient.post(`${environment.baseUrl}/api/v1/upload-receipt-and-id`, uploadImageData, { observe: 'response' })
        .subscribe((response: any) => {
          console.log(response)
          if (response.status === 200) {
            this.message = 'You successfully booked the course!';
            this.isAlertOpen = true;
            this.academyService.fetchMyCourses.next();
            this.loading = false;

          } else {
            this.isAlertOpen = true;

            this.message = 'Image not uploaded successfully';
            this.loading  = false;
          }
        }, (err: any) => {
          console.log(err);
          this.isAlertOpen = true;

          this.message = 'Image not uploaded successfully, please try again!';
          this.loading = false;
        }
        );
    }


    actionButtonClick(type: String) {

     if(type === 'receipt' && !this.receiptDone) {
      this.myUploadRInput.nativeElement.click();
     }
     if(type === 'id' && !this.idDone) {
      this.myUploadIdInput.nativeElement.click();
     }
    }

    async alertDismiss() {
      this.isAlertOpen = false;
      this.router.navigate(['/tabs/academy']);

    }

}

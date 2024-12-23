import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MainteneceService } from 'src/app/services/maintenece.service';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.page.html',
  styleUrls: ['./request-status.page.scss'],
})
export class RequestStatusPage implements OnInit {

  form!: FormGroup;
  isAlertOpen = false;
  message!: string;

  constructor( private navCtrl: NavController, private maintenenceService: MainteneceService, private router:Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      requestNo: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('(01)[0-9]{9}')]),
    });

  }

  submit() {
    this.maintenenceService.getMaintenece(this.form.controls['requestNo'].value, this.form.controls['phone'].value).subscribe(main => {
      //if( main.feedBack) {
        this.router.navigate(['/maintenence-report', {requestNo: this.form.controls['requestNo'].value, phone: this.form.controls['phone'].value}]);
      // } else {
      //   this.message = 'Your maintenence request still under process, please wait.';
      //   this.isAlertOpen = true;
      // }

    }, err => {
      this.isAlertOpen = true;
      this.message = 'You must enter correct request number and the phone number registered with this request.';
    });

  }

  alertDismiss() {
    this.isAlertOpen = false;
    //this.navCtrl.back()
  }



}

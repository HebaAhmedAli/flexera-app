import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.page.html',
  styleUrls: ['./request-status.page.scss'],
})
export class RequestStatusPage implements OnInit {

  form!: FormGroup;
  isAlertOpen = false;
  message!: string;

  constructor( private navCtrl: NavController) { }

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
    // const complaint: Complaint = {
    //   complainant: this.form.controls['name'].value,
    //   phone: this.form.controls['phone'].value,
    //   address: this.form.controls['address'].value,
    //   subject: this.form.controls['subject'].value,
    //   description: this.form.controls['description'].value

    // }

    // this.complaintService.createComplaint(complaint).subscribe(() => {
    //   this.message = 'Complaint is successfully submited. We will contact you soon.'
    //   this.isAlertOpen = true;
    // },
    // () => {
    //   this.isAlertOpen = true;
    //   this.message = 'Error while submitting your complaint. Please try again later.'
    // });
  }

  alertDismiss() {
    this.isAlertOpen = false;
    this.navCtrl.back()
  }



}

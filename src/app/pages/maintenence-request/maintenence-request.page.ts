import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Complaint } from 'src/app/models/complaint.model';

@Component({
  selector: 'app-maintenence-request',
  templateUrl: './maintenence-request.page.html',
  styleUrls: ['./maintenence-request.page.scss'],
})
export class MaintenenceRequestPage implements OnInit {

  form!: FormGroup;
  isAlertOpen = false;
  message!: string;

  constructor( private navCtrl: NavController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('(01)[0-9]{9}')]),
      device: new FormControl('', Validators.required),
      serialNo: new FormControl('', Validators.required),
      complaint: new FormControl('', Validators.required)
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

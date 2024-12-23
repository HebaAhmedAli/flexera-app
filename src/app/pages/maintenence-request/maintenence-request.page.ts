import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Maintenece } from 'src/app/models/maintenence.model';
import { UserModel } from 'src/app/models/user.model';
import { MainteneceService } from 'src/app/services/maintenece.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-maintenence-request',
  templateUrl: './maintenence-request.page.html',
  styleUrls: ['./maintenence-request.page.scss'],
})
export class MaintenenceRequestPage implements OnInit {

  form!: FormGroup;
  isAlertOpen = false;
  message!: string;
  goBack = true;

  constructor( private navCtrl: NavController, private maintenenceService: MainteneceService, private storage: SecureStorage) { }

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

  async submit() {
    const user: UserModel = await this.storage.get('user');
    if(user.phone !== this.form.controls['phone'].value) {
      this.message = 'The phone must be same as your registered phone number.';
      this.goBack = false;
      this.isAlertOpen = true;
      return;
    }
    const maintainence: Maintenece = new Maintenece();
    maintainence.name = this.form.controls['name'].value;
    maintainence.phone =  this.form.controls['phone'].value;
    maintainence.device = this.form.controls['device'].value;
    maintainence.serialNo = this.form.controls['serialNo'].value;
    maintainence.complaint = this.form.controls['complaint'].value;

    this.maintenenceService.createMaintenece(maintainence).subscribe((maintainenceCr) => {
      this.message = 'Your request is successfully submited with request number ' + (maintainenceCr as Maintenece).id + '. You will need this number to track the request. ';
      this.goBack = true;
      this.isAlertOpen = true;
    },
    () => {
      this.isAlertOpen = true;
      this.goBack = true;
      this.message = 'Error while submitting your Maintenece. Please try again later.'
    });
  }

  alertDismiss() {
    this.isAlertOpen = false;
    if(this.goBack) {
      this.navCtrl.back()
    }
  }



}

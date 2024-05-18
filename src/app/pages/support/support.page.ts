import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { SystemParametersService } from 'src/app/services/system-parameters.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  isAlertOpen = false;
  mode!: string;
  message!: string;
  phoneNumber!: string;
  whatsappNumber!: string;

  constructor(private storage: SecureStorage, private router: Router, private sysParamServ: SystemParametersService) { }

  async ngOnInit() {
    this.phoneNumber = this.sysParamServ.getValue('PHONE_NUMBER') as string;
    this.whatsappNumber = this.sysParamServ.getValue('WHATSAPP_NUMBER') as string;

  }

  async sumbitComplaint() {
    this.mode =  await this.storage.get('mode');
    if(this.mode === 'guest') {
      this.message = 'You need to login first to submit a complaint!'
      this.isAlertOpen = true;
    } else {
      this.router.navigateByUrl('/submit-complaint');
    }
  }
}

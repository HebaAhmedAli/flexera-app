import { Component, OnInit } from '@angular/core';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  userEmail = 'fargalaxy24@gmail.com';
  code!: string;

  constructor(private forgetPasswordService: ForgetPasswordService) { }

  ngOnInit() {
    this.forgetPasswordService.sendCode(this.userEmail).subscribe(() => {
      setTimeout(() => this.forgetPasswordService.verifyCode(this.userEmail, this.code).subscribe(), 5.5 * 60 * 1000);
    });

  }

}

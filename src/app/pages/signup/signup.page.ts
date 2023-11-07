import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  showPassword: boolean = false;
  showAdditional: boolean = true;

  title: string = '';
  speciality: string = '';
  uniStaff: string = '';

  constructor(
    private router: Router,
    private storage: SecureStorage
  ) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async signup() {
    await this.storage.set('mode', 'user');
    this.router.navigateByUrl('tabs');
  }

}

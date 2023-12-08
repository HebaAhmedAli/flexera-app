import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginRequestModel } from 'src/app/models/login-request.model';
import { LoginResponseModel } from 'src/app/models/login-response.model';
import { AuthService } from 'src/app/services/auth.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword: boolean = false;
  loginResponse!: LoginResponseModel;

  message: string = '';
  isAlertOpen = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required])});

  constructor(
    private router: Router,
    private storage: SecureStorage,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    if (this.loginForm.valid) {
      const loginRequest = new LoginRequestModel();
      loginRequest.email = this.loginForm.get('email')?.value as string;
      loginRequest.password = this.loginForm.get('password')?.value as string;

      this.authService.login(loginRequest).subscribe(async (response: any) => {
        if(response.status === 200) {
          console.log(response);
          this.loginResponse = response.body;
          await this.storage.set('mode', 'user');
          await this.storage.set('token', this.loginResponse.tokenType + ' ' + this.loginResponse.accessToken);
          this.router.navigateByUrl('tabs');
        } else {
          this.isAlertOpen = true;
          this.message = response.error.message;
        }
      }, error => {
        this.message = error.error.message;
        this.isAlertOpen = true;
      }
      );
    } else {
      console.log('Form is invalid', this.loginForm.errors);

      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }

  }

  async alertDismiss() {
    this.isAlertOpen = false;
  }

}

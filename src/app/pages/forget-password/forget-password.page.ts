import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  emailStep = true;
  verifyStep = false;
  resetPasswordStep = false;
  isVerificationSuccess = false;
  isVerificationFailed = false;
  showPassword = false;
  passwordsMatch = false;
  userEmailForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
  });

  codeForm = new FormGroup({
    code: new FormControl('', [Validators.required])
  });

  passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8), 	 	Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)]),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private forgetPasswordService: ForgetPasswordService,
     private loadingController: LoadingController,
      private navCtrl: NavController) { }

  ngOnInit() {
    this.passwordForm.controls.confirmPassword.valueChanges.subscribe(val => {
      this.passwordsMatch = val === this.passwordForm.controls.password.value;
      if(!this.passwordsMatch){
        this.passwordForm.controls.confirmPassword.setErrors({notMatch: true});
      }
    });
  }

  sendCode() {
    this.emailStep = false;
    this.verifyStep = true;
    this.forgetPasswordService.sendCode(this.userEmailForm.controls.userEmail?.value!).subscribe();
  }

  async verifyCode() {
    const loader = await this.showLoading('Verifying...');
    this.forgetPasswordService.verifyCode(this.userEmailForm.controls.userEmail?.value!, this.codeForm.controls.code?.value!).subscribe(() => {
      this.isVerificationSuccess = true;
      this.resetPasswordStep = true;
      this.verifyStep = false;
      this.dismissLoading(loader);
    }, () => {
      this.isVerificationFailed = true;
      this.dismissLoading(loader);
    })
  }

  async resetPassword() {
    const loader =  await this.showLoading('Redirecting to login...');
    this.forgetPasswordService.resetPassword(this.userEmailForm.controls.userEmail?.value!, this.passwordForm.controls.password?.value!).subscribe(() => {
      this.dismissLoading(loader);
      this.navCtrl.navigateBack(['/login']);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  async showLoading(message: string) {
    const loader = await this.loadingController.create({
      message
    });
    loader.present();
    return loader;
  }

  dismissLoading(loader: HTMLIonLoadingElement) {
    loader.dismiss();
  }




}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TermsAndConditionsComponent } from 'src/app/components/terms-and-conditions/terms-and-conditions.component';
import { LookupItem } from 'src/app/models/lookup-item.model';
import { SignUpRequestModel } from 'src/app/models/signup-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { LookupItemsService } from 'src/app/services/lookup-item.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';
import { SystemParametersService } from 'src/app/services/system-parameters.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  showPassword: boolean = false;
  showAdditional: boolean = true;
  isAlertOpen: boolean = false;
  message: string = '';
  status: number = 0;

  referralList: LookupItem[] = [];

  showReferralList!: string;

 signupForm = new FormGroup({
  title: new FormControl('', Validators.required),
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
  phone: new FormControl('', [Validators.required, Validators.pattern('(01)[0-9]{9}')]),
  password: new FormControl('', [Validators.required, Validators.minLength(8), 	 	Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)]),//this is for the letters (both uppercase and lowercase) and numbers validation
  address: new FormControl(''),
  age: new FormControl(''),
  speciality: new FormControl(''),
  uniStaff: new FormControl(''),
  university: new FormControl(''),
  termsAndConditions: new FormControl(false, Validators.requiredTrue),
  referral: new FormControl(''),

});

  constructor(
    private router: Router,
    private storage: SecureStorage,
    private authService: AuthService,
    private modalController: ModalController,
    private systemParametersService: SystemParametersService,
    private lookupItemsService: LookupItemsService
  ) { }

  ngOnInit() {
    this.showReferralList = this.systemParametersService.getValue('SHOW_REGISTER_REFERRAL') as string;
    this.referralList = this.lookupItemsService.getLookupByGroup('REGISTER_REFERRAL') as LookupItem[];
    if(this.showReferralList === 'Y') {
      this.referral?.addValidators([Validators.required]);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async openTermsAndConditions() {
    const modal = await this.modalController.create({
      component: TermsAndConditionsComponent,
      cssClass: 'image-modal'
    });
    return await modal.present();
  }

  async signup() {
    if (this.signupForm.valid) {
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const signUpRequest = new SignUpRequestModel();
      signUpRequest.title = this.title?.value as string;
      signUpRequest.name = this.name?.value as string;
      signUpRequest.email = this.email?.value?.toLowerCase() as string;
      signUpRequest.phone = this.phone?.value as string;
      signUpRequest.password = this.password?.value as string;
      signUpRequest.address = this.address?.value as string;
      signUpRequest.age = Number(this.age?.value);
      signUpRequest.speciality = this.speciality?.value as string;
      signUpRequest.uniStaff = this.uniStaff?.value as string;
      signUpRequest.university = this.university?.value as string;
      signUpRequest.role = environment.role;
      signUpRequest.referral = this.referral?.value as string;
      this.authService.signUp(signUpRequest).subscribe(async (response: any) => {
        if(response.status === 200) {
          this.message = 'You are registered successfully. Navigate to login';
        } else {
          this.message = response.error.message;
        }
        this.status = response.status;
        this.isAlertOpen = true;
      }, error => {
        this.message = error.error.message;
        this.status = error.status;
        this.isAlertOpen = true;
      }
      );

    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }

  }

  async alertDismiss() {
    this.isAlertOpen = false;
    if(this.status === 200) {
      await this.storage.set('mode', 'user');
      this.router.navigateByUrl('login');
    }
  }


  get title() {
    return this.signupForm.get('title');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get phone() {
    return this.signupForm.get('phone');
  }

  get address() {
    return this.signupForm.get('address');
  }

  get age() {
    return this.signupForm.get('age');
  }



  get speciality() {
    return this.signupForm.get('speciality');
  }

  get uniStaff() {
    return this.signupForm.get('uniStaff');
  }

  get university() {
    return this.signupForm.get('university');
  }

  get referral() {
    return this.signupForm.get('referral');
  }
}

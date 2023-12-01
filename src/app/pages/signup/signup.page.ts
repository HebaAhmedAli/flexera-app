import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

 signupForm = new FormGroup({
  title: new FormControl('', Validators.required),
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  phone: new FormControl('', [Validators.required, Validators.pattern('(01)[0-9]{9}')]),
  password: new FormControl('', [Validators.required, Validators.minLength(8), 	 	Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),//this is for the letters (both uppercase and lowercase) and numbers validation
  address: new FormControl(''),
  age: new FormControl(''),
  speciality: new FormControl(''),
  uniStaff: new FormControl(''),
  university: new FormControl('')
});

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
    if (this.signupForm.valid) {
      console.log('Form is valid', this.signupForm.value);
      await this.storage.set('mode', 'user');
      this.router.navigateByUrl('tabs');
    } else {
      console.log('Form is invalid', this.signupForm.errors);


      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
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
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user?: UserModel;
  profileForm!: FormGroup;
  isAlertOpen = false;
  message?: string;

  constructor(private storage: SecureStorage, private profileService: ProfileService, private router: Router, private navCtrl: NavController) { }

  async ngOnInit() {
    this.user = await this.storage.get('user') as UserModel;
    this.initForm();
  }

  initForm() {
    this.profileForm = new FormGroup({
      title: new FormControl(this.user?.title, Validators.required),
      name: new FormControl(this.user?.name, Validators.required),
      email: new FormControl({value: this.user?.email, disabled: true}, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl({value: this.user?.phone, disabled: true}, [Validators.required, Validators.pattern('(01)[0-9]{9}')]),
      address: new FormControl(this.user?.address),
      age: new FormControl(this.user?.age),
      speciality: new FormControl(this.user?.speciality),
      uniStaff: new FormControl(this.user?.uniStaff),
      university: new FormControl(this.user?.university)
    });
    
  }

  get uniStaff() {
    return this.profileForm.controls['uniStaff'].value;
  }

  save() {
    const updatedUser: Partial<UserModel> = {
      id: this.user?.id,
      title: this.profileForm.controls['title'].value,
      name: this.profileForm.controls['name'].value,
      address: this.profileForm.controls['address'].value,
      age: this.profileForm.controls['age'].value,
      speciality: this.profileForm.controls['speciality'].value,
      uniStaff: this.profileForm.controls['uniStaff'].value,
      university: this.profileForm.controls['university'].value
    }

    this.profileService.updateProfile(updatedUser).subscribe(
      async (res) => {
        await this.storage.set('user', res);
        this.profileService.userUpdated.next();
        this.isAlertOpen = true;
        this.message = 'Profile has been successfully updated';
      }, () => {
        this.isAlertOpen = true;
        this.message = 'An error occurred while updating profile. Please try again later!';
      }
    );
  }

  async alertDismiss() {
    this.isAlertOpen = false;
    this.navCtrl.navigateBack(['/tabs/account']);
  }
}

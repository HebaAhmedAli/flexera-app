import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private storage: SecureStorage, private profileService: ProfileService) { }

  async ngOnInit() {
    this.user = await this.storage.get('user') as UserModel;
    this.initForm();
  }

  initForm() {
    this.profileForm = new FormGroup({
      title: new FormControl(this.user?.title, Validators.required),
      name: new FormControl(this.user?.name, Validators.required),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl(this.user?.phone, [Validators.required, Validators.pattern('(01)[0-9]{9}')]),
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
    this.profileService.updateProfile({name: "Feryal Hisham", age: 27, title: 'Dr.'}).subscribe();
  }
}

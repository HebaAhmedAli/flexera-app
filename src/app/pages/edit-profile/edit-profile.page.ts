import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  title: string = 'Mr.';
  name : string = 'Abd Elrhman Ahmed Morsy';
  email : string = 'aam@gmail.com';
  phone: string = '01270908334';
  address : string = 'Elshrok street esmail serry';
  speciality: string = 'GP';
  uniStaff: string = 'No';
  university: string = 'No';
  age: string = '';

  constructor() { }

  ngOnInit() {
  }

}

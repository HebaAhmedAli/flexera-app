import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  userName : string = 'Abd Elrhman Ahmed Morsy';
  userEmail : string = 'aam@gmail.com';
  userPhone: string = '01270908334';
  userAddress : string = 'Elshrok street esmail serry';

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router, private storage: SecureStorage) { }

  ngOnInit() {
  }

  async navigateToTabs() {
    await this.storage.set('mode', 'guest');
    this.router.navigateByUrl('tabs');
  }
}

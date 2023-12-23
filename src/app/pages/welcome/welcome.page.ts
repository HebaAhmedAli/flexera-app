import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  splashMode : boolean = false;
  constructor(private router: Router, private storage: SecureStorage) { }

  async ngOnInit() {
  }

  async ionViewWillEnter() {
    const token = await this.storage.get('token');
    console.log(token);
    if(token) this.splashMode = true;
    if(this.splashMode) {
      setTimeout(async () => {
        await this.storage.set('mode', 'user');
        this.router.navigateByUrl('tabs');
      }, 3100);
    }
  }

  async navigateToTabs() {
    await this.storage.set('mode', 'guest');
    this.router.navigateByUrl('tabs');
  }
}

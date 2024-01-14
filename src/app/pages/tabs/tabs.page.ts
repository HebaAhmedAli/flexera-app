import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, Platform } from '@ionic/angular';
import { SecureStorage } from 'src/app/services/secure-storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('ionTabs', { static: true })
  ionTabs!: IonTabs;

  constructor(private location: Location, private platform: Platform, private storage: SecureStorage, private router: Router) {
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      const mode = await this.storage.get('mode');
      console.log(this.router.routerState.snapshot.url);
      if (this.router.routerState.snapshot.url === '/notifications') {
       this.router.navigate(['/tabs/home']);
      }
      else if ((this.router.routerState.snapshot.url !== '/tabs/home' && !this.router.routerState.snapshot.url.includes('/order-success')) || mode === 'guest') {
        if(this.router.routerState.snapshot.url === '/tabs/home') {
          this.router.navigate(['/welcome'])
        } else  if(this.router.routerState.snapshot.url !== '/welcome'){
          this.location.back();

        }

      }
    });
  }

}

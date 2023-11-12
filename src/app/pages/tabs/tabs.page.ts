import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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

  constructor(private location: Location, private platform: Platform, private storage: SecureStorage) {
    this.platform.backButton.subscribeWithPriority(-1, async () => {
      const mode = await this.storage.get('mode');
      console.log(mode, this.ionTabs.outlet.canGoBack());
      if (!this.ionTabs.outlet.canGoBack() && mode === 'guest') {
        this.location.back();
      }
    });
  }

}

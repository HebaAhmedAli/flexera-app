import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';


import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform, private modalCtrl: ModalController, private navCtrl: NavController, private splash: SplashScreen) {
    this.platform.ready().then(async () => {
      this.splash.hide();
      this.navCtrl.navigateForward('/', { animated: false });
    });
  }
}

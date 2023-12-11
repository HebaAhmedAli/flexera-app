import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';


import { register } from 'swiper/element/bundle';
import { CartService } from './services/cart.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform, private cartService: CartService, private navCtrl: NavController, private splash: SplashScreen) {
    this.platform.ready().then(async () => {
      this.splash.hide();
      this.cartService.initializeCart();
      this.navCtrl.navigateForward('/', { animated: false });
    });
  }
}

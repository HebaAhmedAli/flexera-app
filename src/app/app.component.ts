import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';


import { register } from 'swiper/element/bundle';
import { CartService } from './services/cart.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { NotificationService } from './services/notification.service';
import { GlobalService } from './services/global.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform, private cartService: CartService, private navCtrl: NavController, private splash: SplashScreen, private firebase: FirebaseX
    , private notificationService: NotificationService, private router: Router, private globalService: GlobalService) {

      // this.router.events.subscribe(event => {
      //   if (event instanceof NavigationEnd && event.url !== '/') {
      //     console.log(event.url, this.router.routerState.snapshot.url);
      //     if(this.globalService.lastUrl === '/notifications') {
      //       if(event.url === '/cart' || event.url === '/tabs/home')
      //       this.globalService.lastMainUrlBeforeNotifications = event.url;
      //     }
      //     this.globalService.lastUrl = event.url;
      //   }
      // });

    this.platform.ready().then(async () => {
      this.splash.hide();
      this.cartService.initializeCart();
      this.notificationService.getNotifications();
      if(this.platform.is('cordova')) {

        this.firebase.getToken().then((token) => {
            console.log('getToken', token);
          });

          this.firebase.onTokenRefresh().subscribe((token) => {
            console.log('onTokenRefresh', token);
          });

          this.firebase.onMessageReceived().subscribe(data => {
            setTimeout(() => this.notificationService.getNotifications(), 1000);

            console.log('inside onNotification', data);
            if (data.wasTapped) {
              console.log("Background");
            } else {
              console.log("Foreground");
            };
          });

          this.firebase.subscribe('products').then(data => {
            console.log('inside topic', data);
          });
          this.firebase.subscribe('courses').then(data => {
            console.log('inside topic', data);
          });
      }

      this.navCtrl.navigateForward('/', { animated: false });
    });

    this.platform.resume.subscribe(async () => {
      this.notificationService.getNotifications();
    });
  }
}

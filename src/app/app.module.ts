import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';

import { Keyboard } from '@ionic-native/keyboard/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
  providers: [
     Storage,
     SplashScreen,
     Network,
     Geolocation,
     AppVersion,
     Market,
    // FCM,
    FirebaseX,
    Keyboard,
    // Biometric Auth
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}

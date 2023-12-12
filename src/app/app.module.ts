import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule ],
  providers: [ Camera,
     Storage,
     SplashScreen, 
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

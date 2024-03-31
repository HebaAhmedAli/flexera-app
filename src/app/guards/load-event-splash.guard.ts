import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SystemParametersService } from '../services/system-parameters.service';
import { SecureStorage } from '../services/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoadEventSplashGuard implements CanActivate {
  loadEventSplash!: string;
   constructor(private storage: SecureStorage, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //if(loadEventSplash !== 'Y') this.router.navigateByUrl('welcome');
    // return loadEventSplash === 'Y' ? true : false;
   // return true;
    return this.storage.get('SHOW_EVENT_SPLASH').then((loadEventSplash) => {
      if(!loadEventSplash) loadEventSplash = 'Y';
      if(loadEventSplash !== 'Y') this.router.navigateByUrl('welcome');
      return loadEventSplash === 'Y' ? true : false;
  });
  }

}

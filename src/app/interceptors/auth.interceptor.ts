import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.getToken().pipe(switchMap(token => {
      if(token) {
        const newRequest = request.clone({
          headers: new HttpHeaders().append('Authorization', token)
        });
        return next.handle(newRequest);
      } else {
        return next.handle(request);
      }
    }))
    
  }
}

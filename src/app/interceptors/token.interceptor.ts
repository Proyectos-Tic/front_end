import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public securityService: SecurityService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //FROM ANGULAR TO API GATEWAY
    let currentSession = this.securityService.userCurrentSession;
    if (currentSession){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentSession.token}`
        }
      });
    }
    // PROCESS RESPONSE FROM API GATEWAY
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401){
          this.router.navigateByUrl('/pages/dashboard');
        }
        if (err.status === 404){
          this.router.navigateByUrl('/pages/miscellaneous/404')
        }
        return throwError(err);
      })
    );
  }
}

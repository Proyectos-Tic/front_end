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

  constructor(public securityService: SecurityService,
              public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // From Angular to ApiGateway
    let currentSession = this.securityService.userCurrentSession;
    if (currentSession) {
      // Preventing error from pass by reference (obj)
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentSession.token}`
        }
      });
    }
    // Process response from ApiGateway
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          this.router.navigateByUrl('/pages/dashboard');
        }
        return throwError(err);
      })
    );
  }
}

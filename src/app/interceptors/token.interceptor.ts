import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private securityService: SecurityService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentSession = this.securityService.userCurrentSession;
    if(currentSession){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentSession.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          this.router.navigate(["/pages/dashboard"])
        }
        return throwError(err);
      })
    );
  }
}

import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(
        private cookieService: CookieService,
        private router: Router,
        private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let req = request;
        const token = this.cookieService.get('token');
        if (token) {
            req = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => event),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.setLoggedIn(false);
                    this.router.navigate(['/login']);
                }
                return throwError(error);
            })
        );
    }
}

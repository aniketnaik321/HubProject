import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

 // Retrieve the token from your authentication service
 const authToken = this.authService.GetToken();

 // Clone the request and add the authorization header
 const authRequest = authToken
   ? request.clone({
       setHeaders: {
         Authorization: `Bearer ${authToken}`,
       },
     })
   : request;
    return next.handle(authRequest);
  }
}

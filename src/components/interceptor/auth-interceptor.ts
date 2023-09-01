import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = ''

    const tokenInfoString = localStorage.getItem('tokenInfo');
    if (tokenInfoString) {
        const tokenInfo = JSON.parse(tokenInfoString);
        token = tokenInfo.token;
    }
    
    if (token != '') {
      const authRequest = request.clone({
        setHeaders: { 'Authorization': `Bearer ${token}` }
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  req = req.clone({
    setHeaders:{
      Authorization: `Bearer `+ authService.UserAuthenticate()          
    }
  })
  return next(req);
};

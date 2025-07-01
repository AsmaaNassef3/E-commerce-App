// src/app/core/interceptors/headers.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const HeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('userToken');
  console.log('[HeadersInterceptor] Token found:', token);
  let headers = req.headers;
  if (token) {
    headers = headers.set('token', token);
  }
  const authReq = req.clone({ headers });
  return next(authReq);
};

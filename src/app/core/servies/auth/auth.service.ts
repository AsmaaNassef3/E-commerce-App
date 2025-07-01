import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;

  constructor(private http: HttpClient) {}

  // تسجيل حساب جديد
  sendRegisterForm(data: object): Observable<any> {
    return this.http.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data);
  }

  // تسجيل الدخول
  sendLoginForm(data: object): Observable<any> {
    return this.http.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data);
  }

  // حفظ بيانات التوكن بعد تسجيل الدخول

  // استرجاع كلمة المرور
  setEmailVerify(data: object): Observable<any> {
    return this.http.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data);
  }

  verifyCode(data: object): Observable<any> {
    return this.http.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data);
  }

  resetPassword(data: object): Observable<any> {
    return this.http.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", data);
  }

setCodeVerify(data: object): Observable<any> {
  return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data);
}

setResetPass(data: object): Observable<any> {
  return this.http.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data);
}
  saveUserToken(): void {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      try {
        this.userData = jwtDecode(userToken);
        console.log('User data:', this.userData);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('userToken');
        this.userData = null;
      }
    } else {
      this.userData = null;
    }
  }





}

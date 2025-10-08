import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _CookieService = inject(CookieService);
  private readonly _Router = inject(Router);
  userInfo: any;
  userEmail = signal<string>('');
  userName = signal<string>('');
   
  decodeToken() {
    this.userInfo = jwtDecode(this._CookieService.get('token'));
  }

  signUp(formData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, formData);
  }
  signIn(formData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, formData);
  }
  forgotPassword(email: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, email);
  }
  VerifyResetCode(resetCode: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, { resetCode: resetCode });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, { email: email, newPassword: newPassword });
  }
  updateLoggedUserPassword(changePass:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`,changePass);
  }
  updateLoggedUserData(userData:object){
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`,userData);
  }
   signOut(){
    this._CookieService.delete('token');
    this.userInfo = null;
    this._Router.navigate(['/login']);
    localStorage.removeItem('userEmail');
    }
}

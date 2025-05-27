import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private recaptchaVerifier!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;
  private authApiUrl = `${environment.apiUrl}/auth`;
  afAuth: any;



  constructor(private http: HttpClient, private auth: Auth) {

  }


  //  Sign-up (Only Full Name & Email)
  signUp(fullName: string, email: string): Observable<any> {
    return this.http.post(`${this.authApiUrl}/signup`, { fullName, email });
  }

  //  Setup reCAPTCHA for Firebase OTP (Phone)
  setupReCaptcha(containerId: string) {
    if (!this.recaptchaVerifier) {
      this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, { size: 'invisible' });
    }
  }

  //  Send OTP for Phone Login (Handled by Firebase)
  // async sendPhoneOTP(phoneNumber: string): Promise<ConfirmationResult> {
  //   this.setupReCaptcha('recaptcha-container');
  //   return await signInWithPhoneNumber(this.auth, phoneNumber, this.recaptchaVerifier);
  // }
  sendPhoneOTP(phoneNumber: any) {
  
    return this.http.post(`${this.authApiUrl}/send-phone-otp`, { phoneNumber });
  }




  //  Verify OTP for Phone Login (Firebase)
  verifyPhoneOTP(idToken: string): Observable<any> {
    console.log("Sending ID Token to backend:", idToken);
    return this.http.post(`${this.authApiUrl}/verify-phone-otp`, { idToken });
  }

  //  Send OTP for Email Login
  sendEmailOTP(email: string): Observable<any> {
    return this.http.post(`${this.authApiUrl}/send-email-otp`, { "email": email });
  }

  //  Verify Email OTP & Login
  verifyEmailOTP(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.authApiUrl}/verify-email-otp`, { email, otp });
  }


}

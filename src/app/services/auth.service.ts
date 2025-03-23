import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Auth,getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  private recaptchaVerifier!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;
  private apiUrl = environment.apiUrl;


 
  constructor(private http: HttpClient) { 
    this.auth = getAuth();
  }


  //  Sign-up (Only Full Name & Email)
  signUp(fullName: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { fullName, email });
  }
  // //  Setup reCAPTCHA for Firebase OTP (Phone)
  // setupReCaptcha(containerId: string) {
  //   this.recaptchaVerifier = new RecaptchaVerifier(this.auth,containerId, { size: 'invisible' });
  // }

  // //  Send OTP for Phone Login (Handled by Firebase)
  // async sendPhoneOTP(phoneNumber: string): Promise<ConfirmationResult> {
  //   this.setupReCaptcha('recaptcha-container');
  //   return await signInWithPhoneNumber(this.auth, phoneNumber, this.recaptchaVerifier);
  // }

  // //  Verify OTP for Phone Login (Firebase)
  //  verifyPhoneOTP(idToken: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/verify-phone-otp`, { idToken });
  // }

  //  Send OTP for Email Login
  sendEmailOTP(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-email-otp`, { email });
  }

  //  Verify Email OTP & Login
  verifyEmailOTP(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email-otp`, { email, otp });
  }

  
}

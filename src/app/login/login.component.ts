import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule, FormArray, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
//import { getAuth, RecaptchaVerifier } from '@angular/fire/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth"
import { ChangeDetectorRef } from '@angular/core';
import { ConfirmationResult } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // loginForm: FormGroup;
  // isEmailLogin = false; // Toggle between Phone & Email login
  // message: string = '';
  // private auth = getAuth();
  // private recaptchaVerifier!: RecaptchaVerifier;
  // private confirmationResult!: ConfirmationResult;
  // loginWithGoogle: any;
  // isModalOpen: boolean = true;

  // constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

  //   this.loginForm = this.fb.group({

  //     countryCode: ['+91'],
  //     phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
  //     email: ['', [Validators.email]],
  //     otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],

  //   });
  // }


  // // Toggle Login Method (Phone <-> Email)
  // toggleLoginMethod() {
  //   this.isEmailLogin = !this.isEmailLogin;
  //   this.message = ''; // Reset message on toggle
  // }
  //  //  Send OTP Based on Selected Login Method
  //  async sendOTP() {
  //   const { phoneNumber, email } = this.loginForm.value;

  //   if (this.isEmailLogin) {
  //     // Email OTP (Backend via Nodemailer + Redis)
  //     this.authService.sendEmailOTP(email).subscribe(
  //       () => this.message = " OTP sent to email!",
  //       () => this.message = " Failed to send OTP."
  //     );
  //   } else {
  //     // Phone OTP (Handled by Firebase)
  //     try {
  //       this.confirmationResult = await this.authService.sendPhoneOTP(phoneNumber);
  //       this.message = " OTP sent to phone!";
  //     } catch (error) {
  //       this.message = " Failed to send OTP.";
  //     }
  //   }
  // }
  // // Verify OTP & Login
  // async verifyOTP() {
  //   const { phoneNumber, email, otp } = this.loginForm.value;

  //   if (this.isEmailLogin) {
  //     // Email OTP Verification (Backend via Redis)
  //     this.authService.verifyEmailOTP(email, otp).subscribe(
  //       response => this.handleLoginSuccess(response),
  //       () => this.message = " Invalid OTP."
  //     );
  //   } else {
  //     // Phone OTP Verification (Firebase)
  //     try {
  //       const userCredential = await this.confirmationResult.confirm(otp);
  //       const idToken = await userCredential.user.getIdToken();
  //       this.authService.verifyPhoneOTP(idToken).subscribe(
  //          response => this.handleLoginSuccess(response),
  //         () => this.message = " Invalid OTP."
  //       );
  //     } catch (error) {
  //       this.message = " Invalid OTP.";
  //     }
  //   }
  // }

  // //  Handle Login Success & Redirect User
  // private handleLoginSuccess(response: any) {
  //   localStorage.setItem("token", response.token); // Store JWT token
  //   this.message = " Login successful! Redirecting...";

  //      // Redirect user based on role
  //   setTimeout(() => {
  //     if (response.role === "admin") {
  //       this.router.navigate(["/admin-dashboard"]);
  //     } else {
  //       this.router.navigate(["/user-dashboard"]);
  //     }
  //   }, 2000);
  //    () => this.message = "Invalid OTP."
  // }  

  // closeEmailModal(): void {
  //   this.isModalOpen = false;
  //   this.router.navigate(['/']);
  // }


  emailOtp: string = '';
  PhnotpForm: FormGroup;
  PhnVerifyOtpForm: FormGroup;
  maskedPhn='';

  isEmailLogin = false; // Toggle between Phone & Email login
  isOtpSent = false; // Track OTP screen visibility

  EotpForm: FormGroup;
  EverifyOtpForm: FormGroup;
  maskedEmail = ''; // Masked email for display
  otp: string[] = new Array(6).fill('');
  countdown = 60; // Timer for OTP expiration
  private interval: any;
  message: string = '';

  phoneNumber: any;
  confirmationResult!: ConfirmationResult;
  isOTPSent: boolean = false;
  isLoading: boolean = false;
  phnotp: string = '';

  loginWithGoogle: any;
  isModalOpen: boolean = true;
  otpArray: any;
 recaptchaVerifier: any;



  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private cd: ChangeDetectorRef) {

    this.PhnotpForm = this.fb.group({
      countryCode: ['+91'],
      phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      
    });


    this.EotpForm = this.fb.group({

      email: ['', [Validators.email, Validators.required]],

    });
    this.EverifyOtpForm = this.fb.group({
      otp: ['',]
    })
    this.PhnVerifyOtpForm = this.fb.group({
      Phnotp: ['',]
    })
  }

  // Toggle Login Method (Phone <-> Email)
  toggleLoginMethod() {
    this.isEmailLogin = !this.isEmailLogin;
    this.isOtpSent = false; // Reset OTP modal on toggle
    this.message = ''; // Reset message on toggle
  }

  // Send OTP for phone
  async sendphnOTP() {
    if (this.PhnotpForm.invalid) {
      alert("Please enter a valid phone number.");
      return;
    }

    this.isLoading = true;
    try {
      this.authService.sendPhoneOTP(this.phoneNumber).subscribe
      ((data:any)=>{
   
        this.confirmationResult
        this.isOTPSent = true;
        alert('OTP sent successfully!');
      },
    
      (err)=>{
        console.error("OTP not send",err);

      }
      
    
    
    );
      
      // this.isOTPSent = true;
      // alert('OTP sent successfully!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }


  // // Verify OTP for phone
  async verifyphnOTP() {
    if (!this.phnotp) {
      alert("Please enter the OTP.");
      return;
    }

    this.isLoading = true;
    try {
      const userCredential = await this.confirmationResult.confirm(this.phnotp);
      const idToken = await userCredential.user.getIdToken(true);

      if (!idToken) {
        throw new Error("Failed to retrieve ID token.");
      }

      // Send token to backend for verification
      this.authService.verifyPhoneOTP(idToken).subscribe(
        (response) => {
          alert('Phone number verified successfully!');
          console.log('Backend Response:', response);
        },
        (error) => {
          console.error('Backend verification failed:', error);
          alert('OTP verification failed on the server.');
        }
      );
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  // Resend OTP
  resendPOTP() {
    if (this.countdown === 0) {
      this.sendphnOTP();
    }
  }

  // Send OTP for Email Login
  async sendEOTP() {
    const { email } = this.EotpForm.value;
    this.emailOtp = email;
    // const email  = this.emailOtp;
    // console.log(email);

    if (this.isEmailLogin) {
      this.authService.sendEmailOTP(email).subscribe(
        () => {
          this.isOtpSent = true;
          console.log("OTP Sent. isOtpSent:", this.isOtpSent);
          this.maskedEmail = this.maskEmail(email);
          this.startCountdown();
          this.cd.detectChanges(); // Force UI update
          this.message = "OTP sent to email!";
        },
        () => this.message = "Failed to send OTP."
      );
    }
    //   this.authService.sendEmailOTP(email).subscribe(
    //     () => {
    //       this.isOtpSent = true;
    //       console.log("OTP Sent. isOtpSent:", this.isOtpSent);
    //       this.maskedEmail = this.maskEmail(email);
    //       this.startCountdown();
    //       this.cd.detectChanges(); // Force UI update
    //       this.message = "OTP sent to email!";
    //     },
    //     () => this.message = "Failed to send OTP."
    //   );
  }

  // Mask Email for Display
  private maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    return user[0] + '*****' + user.slice(-1) + '@' + domain;
  }

  // Start OTP Countdown Timer
  private startCountdown() {
    this.countdown = 60;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  // Verify OTP for email
  async verifyEOTP() {
    const { otp } = this.EverifyOtpForm.value;
    this.authService.verifyEmailOTP(this.emailOtp, otp).subscribe(
      response => this.handleLoginSuccess(response),
      () => this.message = "Invalid OTP."
    );
  }

 

  
  private handleLoginSuccess(response: any) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);
    
  
    if (response.id) {  // ✅ Only store if ID exists
      localStorage.setItem("userid", response.id);
    } else {
      console.warn("⚠️ User ID is missing in response!");
    }
  
    console.log("✅ Token stored:", localStorage.getItem("token"));
    console.log("✅ Role stored:", localStorage.getItem("role"));
    console.log("✅ UserID stored:", localStorage.getItem("userid"));
    console.log("🔹 Redirecting user with role:", response.role);
  
    setTimeout(() => {
      if (response.role === "admin") {
        this.router.navigate(["/admin-dashboard"]);
      } else {
        this.router.navigate(["/user-dashboard"]);
      }
    }, 2000);
  }


  closeEmailModal(): void {
    this.isModalOpen = false;
    this.router.navigate(['/']);
  }

  // Resend OTP
  resendEOTP() {
    if (this.countdown === 0) {
      this.sendEOTP();
    }
  }

  // Move cursor to next OTP field
  moveToNext(index: number, event: any) {
    if (event.target.value && index < this.otp.length - 1) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}


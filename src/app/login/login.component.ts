import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ReactiveFormsModule, FormArray, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { getAuth, RecaptchaVerifier, ConfirmationResult } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

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




  loginForm: FormGroup;
  isEmailLogin = false; // Toggle between Phone & Email login
  isOtpSent = false; // Track OTP screen visibility
  maskedEmail = ''; // Masked email for display
  otp: string[] = new Array(6).fill('');
  countdown = 60; // Timer for OTP expiration
  private interval: any;
  message: string = '';
  private auth = getAuth();
  private recaptchaVerifier!: RecaptchaVerifier;
  private confirmationResult!: ConfirmationResult;
  loginWithGoogle: any;
  isModalOpen: boolean = true;
otpArray: any;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {

    this.loginForm = this.fb.group({
      countryCode: ['+91'],
      phoneNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email, Validators.required]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

  // Toggle Login Method (Phone <-> Email)
  toggleLoginMethod() {
    this.isEmailLogin = !this.isEmailLogin;
    this.isOtpSent = false; // Reset OTP modal on toggle
    this.message = ''; // Reset message on toggle
  }

  // Send OTP for Email Login
  async sendOTP() {
    const { email } = this.loginForm.value;

    if (this.isEmailLogin) {
      this.authService.sendEmailOTP(email).subscribe(
        () => {
          this.isOtpSent = true;
          console.log("OTP Sent. isOtpSent:", this.isOtpSent);
          this.maskedEmail = this.maskEmail(email);
          this.startCountdown();
          this.message = "OTP sent to email!";
        },
        () => this.message = "Failed to send OTP."
      );
    }
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

  // Verify OTP
  async verifyOTP() {
    const { email, otp } = this.loginForm.value;
    this.authService.verifyEmailOTP(email, otp).subscribe(
      response => this.handleLoginSuccess(response),
      () => this.message = "Invalid OTP."
    );
  }

  // Handle Login Success & Redirect User
  private handleLoginSuccess(response: any) {
    localStorage.setItem("token", response.token);
    this.message = "Login successful! Redirecting...";

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
  resendOTP() {
    if (this.countdown === 0) {
      this.sendOTP();
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


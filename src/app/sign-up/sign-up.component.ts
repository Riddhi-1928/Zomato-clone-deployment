import { Component } from '@angular/core';
import { FormBuilder, Validators,FormControl,FormGroup, ReactiveFormsModule,FormArray, FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  regForm: FormGroup ;
  message: string = '';
  
  
  constructor(private fb:FormBuilder , private router:Router,private authService: AuthService){
   
    this.regForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      terms: [false, Validators.requiredTrue]
    });
  }

  registerUser() {
    if (this.regForm.invalid) return;

    const { fname, email } = this.regForm.value;
    this.authService.signUp(fname, email).subscribe(
      response => {
        this.message = "✅ Sign-up successful! Please check your email for OTP.";
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error => {
        this.message = "❌ Sign-up failed. User may already exist.";
      }
    );
  }
 
}
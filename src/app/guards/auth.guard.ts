import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // canActivate(): boolean {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  // canActivate(): boolean {
  //   const token = localStorage.getItem("token");
    
  //   if (token) {
  //     console.log("✅ Authenticated! Token found.");
  //     return true;
  //   } else {
  //     console.log("🚨 Unauthorized! Redirecting to login.");
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }


  canActivate(): boolean {
    const token = localStorage.getItem("token");
    console.log("🔍 AuthGuard: Checking token...");

    if (token) {
      console.log("✅ AuthGuard: Token found! Access granted.");
      return true;
    } else {
      console.warn("🚨 AuthGuard: No token found! Redirecting to login.");
      this.router.navigate(['/login']);
      return false;
    }
  }




}

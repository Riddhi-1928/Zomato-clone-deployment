import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router) {}

//   canActivate(): boolean {
//     const role = localStorage.getItem("role");  // ✅ Fetch role directly

//     if (role === "admin") {
//       return true;  // ✅ Allow only admin access
//     } else {
//       this.router.navigate(['/']);  // ❌ Redirect non-admin users to home
//       return false;
//     }
// }

// canActivate(): boolean {
//   const role = localStorage.getItem("role"); 
//   console.log("🔹 Checking role in AdminGuard:", role);
//   if (role === "admin") {
//     console.log("✅ Admin access granted!");
//     return true;
//   } else {
//     console.log("🚨 Unauthorized access attempt! Redirecting...");
//     this.router.navigate(['/']);
//     return false;
//   }
// }


canActivate(): boolean {
  const role = localStorage.getItem("role"); 
  console.log("🔹 AdminGuard: Checking role...", role);

  if (role === "admin") {
    console.log("✅ AdminGuard: Role is admin! Access granted.");
    return true;
  } else {
    console.warn("🚨 AdminGuard: Unauthorized access! Redirecting...");
    this.router.navigate(['/']);
    return false;
  }
}


}

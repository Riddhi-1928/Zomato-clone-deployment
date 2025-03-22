import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  adminName: string = "Admin";

  constructor() {}

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

}

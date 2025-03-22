import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  userName: string = "User";

  constructor() {}

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

}

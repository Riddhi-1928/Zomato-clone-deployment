import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { InvestorRelationsComponent } from '../investor-relations/investor-relations.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 
  isMenuOpen = false;


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private dialog: MatDialog ) {}


  //   openLogin(event: Event) {
  //     event.preventDefault(); // ✅ Prevents page reload on click
  //     this.dialog.open(LoginComponent, {
  //     width: '350px',  // Adjust modal width
  //     disableClose: false,  // Allows closing on outside click
  //   });
  // }

  

  
}

import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterOutlet ,Router,NavigationEnd} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { InvestorRelationsComponent } from "./investor-relations/investor-relations.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zomato';

  isInvestorPage = false;
  isAdminRoute= false;
  isUserRoute=false;
  isResDetails=false;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        // Enable Investor Navbar only on '/investor' route
        //this.isInvestorPage = this.router.url.includes('/investor-relations');
      
        this.isInvestorPage = url.includes('/investor-relations');
        this.isAdminRoute = url.includes('/admin-dashboard') || url.includes('/manage-restaurants') || url.includes('/item-management') || url.includes('/order-management') ;
        this.  isUserRoute = url.includes('/user-dashboard');
        this.   isResDetails = url.includes('/restaurant-detail');

      }
    });
  

  }

}

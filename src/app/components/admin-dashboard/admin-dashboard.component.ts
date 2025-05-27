import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';
import {LucideAngularModule, UtensilsCrossed,Package,X, AlignJustify} from 'lucide-angular'


@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule,CommonModule,FooterComponent,NgxChartsModule,LucideAngularModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  showSidebar = true; // toggle sidebar state

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  rest_icon=UtensilsCrossed
  order_icon= Package
  close_icon=X
  open_icon=AlignJustify


  view: [number, number] = [600, 300];

  orderStats = [
    { name: 'Pending', value: 4 },
    { name: 'Completed', value: 24 },
    { name: 'Cancelled', value: 2 },
  ];
  
  revenueLineData = [
    {
      name: 'Revenue',
      series: [
        { name: 'Jan', value: 45000 },
        { name: 'Feb', value: 50000 },
        { name: 'Mar', value: 47000 },
        { name: 'Apr', value: 52000 },
        { name: 'May', value: 60000 },
      ],
    },
  ];
  
  colorScheme: Color = {
    name: 'zomato-theme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#E53935', // Zomato red
      '#D32F2F', // Deep red
      '#F44336', // Lighter red
      '#EF5350', // Soft red
      '#FF6F61', // Coral-ish red
      '#F28B82', // Blush red
      '#FF7043'  // Warm orange-red
    ]
  };


  
  //isDarkMode = false;
  adminName = 'Riddhi';
  isDropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.clear(); // Or just remove token
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
    }
  }

  // toggleDarkMode() {
  //   this.isDarkMode = !this.isDarkMode;
    
  // }


}

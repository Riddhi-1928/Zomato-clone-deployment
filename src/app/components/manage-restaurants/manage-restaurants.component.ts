import { ChangeDetectorRef, Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-restaurants',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './manage-restaurants.component.html',
  styleUrl: './manage-restaurants.component.css'
})
export class ManageRestaurantsComponent {
  // ngOnInit() {
  //   console.log(" Manage Restaurants Component Loaded!");
  // }
  

  restaurants: any[] = [];  // Store all restaurants
  selectedRestaurant: any = null;

  restaurant = { 
    _id: '',
    name: '', 
    location: '',
    cuisine: '', 
    avg_price: null, 
    image: '', 
    opening_time: '', 
    closing_time: ''
  
  };
 

  constructor(private adminService: AdminService,private router: Router,private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    this.loadRestaurants(); // Fetch restaurants when the component loads
  }

  //  Fetch All Restaurants
  loadRestaurants() {
    this.adminService.getAllRestaurants().subscribe({
      next: (data: any) => {
        this.restaurants = data;
        console.log("📌 Fetched Restaurants Data:", this.restaurants);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error(" Error fetching restaurants:", err);
      }
    });
  }



  addRestaurant() {
    this.adminService.addRestaurant(this.restaurant).subscribe({
      next: (res) => {
        alert(' Restaurant Added Successfully!');
        this.restaurant = { 
         _id:'', name: '', location: '', cuisine: '', avg_price: null, image: '', opening_time: '', closing_time: ''
        };
        this.loadRestaurants(); // Refresh list after adding
      },
      error: (err) => {
        console.error(" Error adding restaurant:", err);
        alert(err.error?.message || 'Error adding restaurant');
      }
    });
  }
  editRestaurant(restaurant: any) {
    this.selectedRestaurant = { ...restaurant }; // Clone to avoid modifying directly
  }
  
   updateRestaurant() {
    if (!this.selectedRestaurant || !this.selectedRestaurant._id) {
      console.warn(" No restaurant selected for update!");
      return;
    }
    this.adminService.updateRestaurant(this.selectedRestaurant._id, this.selectedRestaurant)
      .subscribe({
        next: (res) => {
          alert(" Restaurant Updated Successfully!");
          this.selectedRestaurant = null; // Hide form
          this.loadRestaurants();
        },
        error: (err) => alert(" Error updating restaurant")
      });
  }

  
  cancelEdit() {
    this.selectedRestaurant = null; // Hide edit form
  }
  
//  Delete Restaurant
deleteRestaurant(id: string) {
  if (!confirm("⚠️ Are you sure you want to delete this restaurant?")) {
    return;
  }

  this.adminService.deleteRestaurant(id).subscribe({
    next: () => {
      alert("✅ Restaurant Deleted Successfully!");
      this.loadRestaurants();
    },
    error: (err) => {
      console.error(" Error deleting restaurant:", err);
      alert(err.error?.message || "Error deleting restaurant");
    }
  });
}

  closeForm() {
    console.log(" Closing form & redirecting to Admin Dashboard");
    this.router.navigate(['/admin-dashboard']); // Redirect to Admin Dashboard
  }


}
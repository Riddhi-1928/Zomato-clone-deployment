import { Component,OnInit} from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { CommonModule } from '@angular/common';
import { RestaurantItemsComponent } from "../restaurant-items/restaurant-items.component";
import { FeaturedItemsComponent } from '../featured-items/featured-items.component';
import { FoodcategoryComponent } from '../foodcategory/foodcategory.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { OptionsComponent } from '../options/options.component';
import { CollectionComponent } from '../collection/collection.component';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-home',
  imports: [ CommonModule,FormsModule,FooterComponent,OptionsComponent,CollectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{

  ngOnInit(): void {
    
  }

 
location: string = 'Pune';  // Default location
  searchQuery: string = '';
  showLocationDropdown: boolean = false;
  locations: string[] = ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai'];  // Sample locations

  toggleLocationDropdown() {
    this.showLocationDropdown = !this.showLocationDropdown;
  }

  selectLocation(location: string) {
    this.location = location;
    this.showLocationDropdown = false;  // Close dropdown after selection
  }



}

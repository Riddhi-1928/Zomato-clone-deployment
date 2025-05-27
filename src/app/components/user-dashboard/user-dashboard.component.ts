import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component,ElementRef, HostListener, ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RestaurantServiceService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';
import { FooterComponent } from '../../footer/footer.component';



@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule,FooterComponent,RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  
  userName = 'Riddhi';
  userImageUrl = 'https://via.placeholder.com/40';
  

  dropdownOpen = false;
  foodList = [
    { name: 'Biryani', image: 'assets/images/biryani.jpg' },
    { name: 'Pizza', image: 'assets/images/margherita.jpg' },
    { name: 'Chicken', image: 'assets/images/chicken.jpg' },
    { name: 'Thali', image: 'assets/images/thali.jpg' },
    { name: 'Burger', image: 'assets/images/cheeseburger.jpg' },
    { name: 'Cake', image: 'assets/images/chocolate-cake.jpg' },
    { name: 'Paneer', image: 'assets/images/paneer.jpg' },
    { name: 'Momos', image: 'assets/images/momos.jpg' },
    { name: 'Sandwich', image: 'assets/images/sandwich.jpg' },
    { name: 'Chinese', image: 'assets/images/chinese.jpg' },
    { name: 'Roll', image: 'assets/images/rolls.jpg' }
  ];
  

  brandsList = [
    { name: "McDonald's", image: 'assets/brands/mcdonalds.jpg', time: '31 min' },
    { name: "Domino's Pizza", image: 'assets/brands/dominos.png', time: '25 min' },
    { name: 'Burger King', image: 'assets/brands/burger-king.png', time: '42 min' },
    { name: 'Crazy Cheesy', image: 'assets/brands/crazy-cheesy.jpg', time: '32 min' },
    { name: 'KFC', image: 'assets/brands/kfc.png', time: '35 min' },
    { name: 'Rolls Mania', image: 'assets/brands/rolls-mania.png', time: '32 min' },
    { name: 'Pizza Hut', image: 'assets/brands/pizza-hut.png', time: '35 min' },
    { name: 'Natural Ice Cream', image: 'assets/brands/natural-icecream.png', time: '51 min' },
    { name: 'Subway', image: 'assets/brands/subway.png', time: '34 min' },
    { name: 'The Belgian Waffle Co.', image: 'assets/brands/waffle.jpg', time: '33 min' }
  ];

//backend-get-restaurant
restaurants: Restaurant[] = [];


  @ViewChild('brandsCarousel', { static: false }) brandsCarousel!: ElementRef;
  @ViewChild('carousel', { static: false }) carousel!: ElementRef; 

  constructor(private router: Router,private restaurantService: RestaurantServiceService,private cdr: ChangeDetectorRef) {}

  
  toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  
    logout() {
      localStorage.clear(); // Or just remove token
      this.router.navigate(['/login']);
    }
  
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        this.dropdownOpen = false;
      }
    }
   
  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }


  scrollBrandsLeft() {
    this.brandsCarousel.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }
  
  scrollBrandsRight() {
    this.brandsCarousel.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  ngOnInit(){
    this.loadRestaurants(); // Fetch restaurants when the component loads
}

  //  Fetch All Restaurants
  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe({
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




}

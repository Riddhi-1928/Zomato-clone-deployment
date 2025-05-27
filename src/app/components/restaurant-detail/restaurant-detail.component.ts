import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { CommonModule } from '@angular/common';
import { RestaurantServiceService } from '../../services/restaurant.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-restaurant-detail',
  imports: [CommonModule],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: any;
  items: any[] = [];

  cart: any[] = [];

  userName = 'Riddhi';
  dropdownOpen = false;

  constructor(private router: Router, private route: ActivatedRoute, private restaurantService: RestaurantServiceService,private cartService: CartService) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchRestaurant(id);
      this.fetchItems(id);
    }
  }

  fetchRestaurant(id: string) {
    this.restaurantService.getRestaurantById(id).subscribe({
      next: (data) => {
        this.restaurant = data;
        console.log("✅ Restaurant fetched:", this.restaurant);
      },
      error: (err) => {
        console.error("❌ Error fetching restaurant:", err);
      }
    });
  }

  fetchItems(restaurantId: string) {
    this.restaurantService.getItemsByRestaurantId(restaurantId).subscribe({
      next: (data) => {
        this.items = data;
        console.log("✅ Items fetched:", this.items);
      },
      error: (err) => {
        console.error("❌ Error fetching items:", err);
      }
    });
  }

  // addToCart(item: any) {
  //   console.log("🛒 Item added to cart:", item);
  //   const index = this.cart.findIndex(cartItem => cartItem._id === item._id);
  //   if (index > -1) {
  //     this.cart[index].qty++;
  //   } else {
  //     this.cart.push({ ...item, qty: 1 });
  //   }
  // }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }


  // getQty(item: any): number {
  //   const found = this.cart.find(cartItem => cartItem._id === item._id);
  //   return found ? found.qty : 1;
  // }


  // increaseQty(item: any) {
  //   this.addToCart(item);
  // }

  // decreaseQty(item: any) {
  //   const index = this.cart.findIndex(cartItem => cartItem._id === item._id);
  //   if (index > -1) {
  //     if (this.cart[index].qty > 1) {
  //       this.cart[index].qty--;
  //     } else {
  //       this.cart.splice(index, 1);
  //     }
  //   }
  // }

  getQty(item: any): number {
    return this.cartService.getQty(item._id);
  }

  increaseQty(item: any) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: any) {
    this.cartService.decreaseQty(item);
  }
  getCartLength(): number {
    return this.cartService.getCartLength();
  }



  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']) //if needed
  }
  
  goToCart() {
    this.router.navigate(['/cart']);
  }

}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateOrderComponent } from './create-order/create-order.component';
//import { HomeComponent } from './home/home.component';
import { InvestorRelationsComponent } from './investor-relations/investor-relations.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ManageRestaurantsComponent } from './components/manage-restaurants/manage-restaurants.component';
import { AdminGuard } from './guards/admin.guard';
import { ItemManagementComponent } from './components/item-management/item-management.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  //{path:'',component:HomeComponent, title:'Zomato'},
  { path: 'investor-relations', component: InvestorRelationsComponent, title: 'Investor Relations | zomato' },
  { path: 'add-restaurant', component: AddRestaurantComponent, title: 'Add a restaurant | zomato' },
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'sign-up', component: SignUpComponent, title: 'Sign-up Page' },

  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard], title: 'Admin Dashboard' },
  { path: 'admin-dashboard/manage-restaurants', component: ManageRestaurantsComponent, canActivate: [AuthGuard, AdminGuard], title: 'Manage Restaurants' },
  // { path: 'item-management/:id', component: ItemManagementComponent,canActivate: [AuthGuard,AdminGuard],title: 'Item Management'  },

  { path: '', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent), },

  { path: 'admin-dashboard/item-management/:id', component: ItemManagementComponent, canActivate: [AuthGuard, AdminGuard], title: 'Item Management' },

  { path: 'order-management', component: OrderManagementComponent, canActivate: [AuthGuard, AdminGuard], title: 'Order Management' },

  //{ path: 'admin-dashboard', loadChildren: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [AuthGuard, AdminGuard] },
  //{ path: 'manage-restaurants', loadChildren: () => import('./components/manage-restaurants/manage-restaurants.component').then(m => m.ManageRestaurantsComponent), canActivate: [AuthGuard, AdminGuard] },

  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], title: 'User Dashboard' },
  //{ path: 'user-dashboard', loadChildren: () => import('./components/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent), canActivate: [AuthGuard] },
  { path: 'restaurant-detail/:id', component: RestaurantDetailComponent, canActivate: [AuthGuard], title: 'Restaurant Details' },
  
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }

  
  //{ path: '**', redirectTo: 'login' } // Redirect unknown routes to login
];

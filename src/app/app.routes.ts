import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { HomeComponent } from './home/home.component';
import { InvestorRelationsComponent } from './investor-relations/investor-relations.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent, title:'Zomato'},
    {path:'investor-relations',component:InvestorRelationsComponent , title:'Investor Relations | zomato'},
    {path:'add-restaurant',component:AddRestaurantComponent , title:'Add a restaurant | zomato'},
    {path:'login',component:LoginComponent, title:'Login Page'},
    {path:'sign-up',component:SignUpComponent , title:'Sign-up Page'},
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' } // Redirect unknown routes to login
];

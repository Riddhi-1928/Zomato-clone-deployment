import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {
  private apiUrl = `${environment.apiUrl}/restaurants`;
  private apiUrl1 = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) { }


  // get restaturants
  getAllRestaurants() {
    return this.http.get(`${this.apiUrl}/`);
  }

  // get restaturants by id
  getRestaurantById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  

  //get item by restaurant id
  getItemsByRestaurantId(restaurantId: string): Observable<any> {
    return this.http.get(`${this.apiUrl1}/${restaurantId}`);
  }
  


}

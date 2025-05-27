import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private apiUrl = `${environment.apiUrl}/restaurants`;  // Using environment API URL
  private itemApiUrl = `${environment.apiUrl}/items`; //  Items API

  constructor(private http: HttpClient) { }

  // add restaurant
  addRestaurant(restaurant: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/add`, restaurant, { headers });
  }

// get restaturants
getAllRestaurants() {
  return this.http.get(`${this.apiUrl}/`);
}


// update restaurant
  updateRestaurant(id: string, data: any) {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/${id}`, data,{ headers });
  }

// Delete Restaurant API Call
deleteRestaurant(id: string): Observable<any> {
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 

  return this.http.delete(`${this.apiUrl}/${id}`, { headers });
}


 //  Add New Item
 addItem(restaurantId: string, itemData: any): Observable<any> {
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
  return this.http.post(`${this.itemApiUrl}/${restaurantId}/addItem`, itemData, { headers });
}

//  Get Items for a Specific Restaurant
getItemsByRestaurant(restaurantId: string): Observable<any> {
  return this.http.get(`${this.itemApiUrl}/${restaurantId}`);
}

//  Update an Item
updateItem(restaurantId: string, itemId: string, itemData: any): Observable<any> {
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
  return this.http.put(`${this.itemApiUrl}/${restaurantId}/${itemId}`, itemData, { headers });
}

//  Delete an Item
deleteItem(restaurantId: string ,itemId: string): Observable<any> {
  const token = localStorage.getItem("token");
  const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
  return this.http.delete(`${this.itemApiUrl}/${restaurantId}/${itemId}`, { headers });
}








}

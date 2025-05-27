import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   
  private cart: any[] = [];

  getItems() {
    return this.cart;
  }

  addToCart(item: any) {
    const index = this.cart.findIndex(cartItem => cartItem._id === item._id);
    if (index > -1) {
      this.cart[index].qty++;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }
  }

  // getQty(item: any): number {
  //     const found = this.cart.find(cartItem => cartItem._id === item._id);
  //     return found ? found.qty : 1;
  //   }
  getQty(itemId: string): number {
    const found = this.cart.find(item => item._id === itemId);
    return found ? found.qty : 0;
  }

  
  
    increaseQty(item: any):void {
      this.addToCart(item);
    }
  
    decreaseQty(item: any):void {
      const index = this.cart.findIndex(cartItem => cartItem._id === item._id);
      if (index > -1) {
        if (this.cart[index].qty > 1) {
          this.cart[index].qty  -= 1;
        } else {
          this.cart.splice(index, 1);
        }
      }
    }
    getCartLength(): number {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

  clearCart() {
    this.cart = [];
  }
}



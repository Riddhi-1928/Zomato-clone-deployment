import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    
  freeItem = {
    name: 'Free Dessert' 
  };
  deliveryAddress: string = '';
  cartItems: any[] = [];

  totalBeforeSavings = 0;
  savings = 0;
  total = 0;

  paymentMethods = ['PhonePe UPI', 'Google Pay', 'Cash on Delivery'];
  selectedPaymentMethod = 'PhonePe UPI';
  showPaymentDropdown = false;

  deliveryCharge: number = 40;
  gstAmount: number = 0;
  


  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalBeforeSavings = this.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    this.savings = 29; 
    // this.total = this.totalBeforeSavings - this.savings;
    this.gstAmount = this.totalBeforeSavings * 0.05; // 5% GST
    const subtotal = this.totalBeforeSavings - this.savings + this.gstAmount;
  
    this.total = Math.round(subtotal + this.deliveryCharge);
  
  }

  togglePaymentDropdown() {
    this.showPaymentDropdown = !this.showPaymentDropdown;
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
    this.showPaymentDropdown = false;
  }


  // placeOrder() {
  //   if (!this.deliveryAddress) {
  //     alert('Please enter your delivery address.');
  //     return;
  //   }
  
  //   alert(`✅ Order placed using ${this.selectedPaymentMethod}!\nTotal: ₹${this.total}`);
  //   // Optionally clear cart here
  //   this.cartService.clearCart();
  // }


//   placeOrder() {
//     if (!this.deliveryAddress) {
//       alert('Please enter your delivery address.');
//       return;
//     }
  
//     const paymentData = {
//       amount: this.total
//     };
  
//     fetch('http://localhost:5000/api/payment/create-order', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(paymentData)
//     })
//       .then(res => res.json())
//       .then(order => {
//         const options = {
//           key: environment.razorpayKey, 
//           amount: order.amount,
//           currency: 'INR',
//           name: 'Zomato Clone',
//           description: 'Zomato Order Payment',
//           image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png',
//           order_id: order.id,
//           handler: (response: any) => {
//             alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
//             this.cartService.clearCart();
//           },

        
          
//           prefill: {
//             name: 'Riddhi',
//             email: 'bhoyarriddhi@gmail.com',
//             contact: '7066630541'
//           },
//           notes: {
//             address: this.deliveryAddress
//           },
//           theme: {
//             color: '#EF4444'
//           }
//         };
  
//         const rzp = new (window as any).Razorpay(options);
//         rzp.open();
//       })
//       .catch(err => {
//         console.error('Payment Error:', err);
//         alert('Something went wrong while initiating payment.');
//       });
//   }
  


placeOrder() {
  if (!this.deliveryAddress) {
    alert('Please enter your delivery address.');
    return;
  }

  const paymentData = {
    amount: this.total
  };

  fetch('http://localhost:5000/api/payment/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  })
    .then(res => res.json())
    .then(order => {
      const options = {
        key: environment.razorpayKey,
        amount: order.amount,
        currency: 'INR',
        name: 'Zomato Clone',
        description: 'Zomato Order Payment',
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png',
        order_id: order.id,

        handler: (response: any) => {
          const orderDetails = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            cartItems: this.cartItems,
            totalAmount: this.total,
            deliveryAddress: this.deliveryAddress
          };

          // Save order + generate invoice
          fetch('http://localhost:5000/api/payment/save-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
          })
            .then(res => res.json())
            .then(data => {
              alert("✅ Payment Successful! Invoice is downloading...");
              window.open(`http://localhost:5000${data.invoiceUrl}`, '_blank');
              this.cartService.clearCart();
            })
            .catch(err => {
              console.error("Error saving order:", err);
              alert("Payment was successful but something went wrong while saving the order.");
            });
        },

        prefill: {
          name: 'Riddhi',
          email: 'bhoyarriddhi@gmail.com',
          contact: '7066630541'
        },
        notes: {
          address: this.deliveryAddress
        },
        theme: {
          color: '#EF4444'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    })
    .catch(err => {
      console.error('Payment Error:', err);
      alert('Something went wrong while initiating payment.');
    });
}



}

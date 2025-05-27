import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-item-management',
  imports: [CommonModule,FormsModule],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css'
})
export class ItemManagementComponent  {
  items: any[] = [];
  selectedItem: any = {
    name: '',
    price: null,
    category: '',
    description: '',
    image: '',
    availability: true
  };
  editingItemId: string | null = null;
  restaurantId: string | null = null; 

  constructor(private adminService: AdminService,private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = params.get("id");  // ✅ Fetch and store restaurant ID
      console.log("📌 Fetched Restaurant ID:", this.restaurantId); // Debugging log

      if (this.restaurantId) {
        this.loadItems(this.restaurantId);
      } else {
        console.error("🚨 Restaurant ID is missing!");
      }
    });
  }

  //  Fetch Items for the Restaurant
  // loadItems(restaurantId: string | null) {
  //   if (!restaurantId) {
  //     console.error("🚨 Error: Restaurant ID is required to fetch items!");
  //     return;
  //   }

  //   this.adminService.getItemsByRestaurant(restaurantId).subscribe({
  //     next: (data: any) => {
  //       console.log("📌 Full API Response:", data); // ✅ Log full response
  //       this.items = data.items ? [...data.items] : []; // ✅ Ensure items is an array
  //       console.log("📌 Fetched Items:", this.items);

  //      // this.items = data.items;
  //     },
  //     error: (err) => console.error("❌ Error fetching items:", err)
  //   });
  // }
  

loadItems(restaurantId: string | null) {
  if (!restaurantId) {
    console.error("🚨 Error: Restaurant ID is required to fetch items!");
    return;
  }

  console.log("📌 Fetching Items for Restaurant ID:", restaurantId);

  this.adminService.getItemsByRestaurant(restaurantId).subscribe({
    next: (data: any) => {
      console.log("📌 Full API Response:", data); // ✅ Log full response

      if (data && Array.isArray(data)) {
        this.items = data;  // ✅ If API returns an array directly
      } else if (data?.items && Array.isArray(data.items)) {
        this.items = [...data.items];  // ✅ If `items` is inside an object
      } else {
        console.warn("⚠️ Unexpected API response format!", data);
        this.items = [];
      }

      console.log("📌 Fetched Items:", this.items);
    },
    error: (err) => console.error("❌ Error fetching items:", err)
  });
}


  //  Add New Item
  addItem() {
    if (!this.restaurantId) {
      console.error("🚨 Cannot add item: Restaurant ID is missing!");
      return;
    }

    if (this.editingItemId) {
      this.updateItem();
    } else {
      this.adminService.addItem(this.restaurantId, this.selectedItem).subscribe({
        next: () => {
          alert('✅ Item added successfully!');
          this.selectedItem = { name: '', price: null, category: '', description: '', image: '', availability: true };
          this.loadItems(this.restaurantId);  // ✅ Use stored restaurantId
        },
        error: (err) => alert('❌ Error adding item')
      });
    }
  }

  //  Edit Item (Prefill form with selected item)
  editItem(item: any) {
    this.selectedItem = { ...item }; // Copy item data
    this.editingItemId = item._id;
  }

  //  Update Item
  updateItem() {
    if (!this.editingItemId || !this.restaurantId) {
      console.error("🚨 Cannot update: Missing item ID or restaurant ID!");
      return;
    }

    this.adminService.updateItem(this.restaurantId, this.editingItemId, this.selectedItem).subscribe({
      next: () => {
        alert('✅ Item updated successfully!');
        this.selectedItem = { name: '', price: null, category: '', description: '', image: '', availability: true };
        this.editingItemId = null;
        this.loadItems(this.restaurantId);  // ✅ Use stored restaurantId
      },
      error: (err) => alert('❌ Error updating item')
    });
  }

  //  Delete Item
  deleteItem(itemId: string) {
    if (!this.restaurantId) {
      console.error("🚨 Cannot delete item: Restaurant ID is missing!");
      return;
    }

    if (confirm('Are you sure you want to delete this item?')) {
      this.adminService.deleteItem(this.restaurantId, itemId).subscribe({
        next: () => {
          alert('✅ Item deleted successfully!');
          this.loadItems(this.restaurantId);  // ✅ Use stored restaurantId
        },
        error: (err) => alert('❌ Error deleting item')
      });
    }
  }
}

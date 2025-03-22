import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-foodcategory',
  imports: [CommonModule],
  templateUrl: './foodcategory.component.html',
  styleUrl: './foodcategory.component.css'
})
export class FoodcategoryComponent {
  @Input() category: { name: string, image: string } = { name: '', image: '' }; // Define the category input property
}

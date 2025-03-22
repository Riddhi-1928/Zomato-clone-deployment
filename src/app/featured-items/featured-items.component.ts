import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-items',
  imports: [CommonModule],
  templateUrl: './featured-items.component.html',
  styleUrl: './featured-items.component.css'
})
export class FeaturedItemsComponent {
featuredItems: any;

}

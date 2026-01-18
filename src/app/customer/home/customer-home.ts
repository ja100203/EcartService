import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent],
  templateUrl: './customer-home.html',
  styleUrls: ['./customer-home.css']
})
export class HomeComponent {
  
  searchText = '';
  selectedCategory = '';

  // Categories
  categories = [
    { name: 'Electronics', image: 'https://via.placeholder.com/80' },
    { name: 'Fashion', image: 'https://via.placeholder.com/80' },
    { name: 'Home', image: 'https://via.placeholder.com/80' },
    { name: 'Appliances', image: 'https://via.placeholder.com/80' },
    { name: 'Beauty', image: 'https://via.placeholder.com/80' }
  ];

  // Products
  products = [
    { 
      id: 1, 
      name: 'Laptop', 
      category: 'Electronics', 
      price: 50000, 
      quantity: 3, 
      description: 'High performance laptop', 
      deal: true,
      image: 'https://via.placeholder.com/300x200'
    },
    { 
      id: 2, 
      name: 'Shoes', 
      category: 'Fashion', 
      price: 2000, 
      quantity: 10, 
      description: 'Comfortable running shoes', 
      deal: true,
      image: 'https://via.placeholder.com/300x200'
    },
    { 
      id: 3, 
      name: 'Headphones', 
      category: 'Electronics', 
      price: 3000, 
      quantity: 6, 
      description: 'Noise cancelling headphones', 
      deal: true,
      image: 'https://via.placeholder.com/300x200'
    },
    { 
      id: 4, 
      name: 'T-Shirt', 
      category: 'Fashion', 
      price: 999, 
      quantity: 15, 
      description: 'Soft cotton t-shirt', 
      deal: false,
      image: 'https://via.placeholder.com/300x200'
    },
    { 
      id: 5, 
      name: 'Microwave', 
      category: 'Appliances', 
      price: 7000, 
      quantity: 5, 
      description: 'Compact microwave oven', 
      deal: false,
      image: 'https://via.placeholder.com/300x200'
    },
    { 
      id: 6, 
      name: 'Lipstick', 
      category: 'Beauty', 
      price: 499, 
      quantity: 20, 
      description: 'Long-lasting matte lipstick', 
      deal: false,
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  // Filter products for display
  get filteredProducts() {
    return this.products.filter(p => 
      (!this.selectedCategory || p.category === this.selectedCategory) &&
      (!this.searchText || p.name.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  // Deals of the Day
  get dealsOfTheDay() {
    return this.products.filter(p => p.deal);
  }
}

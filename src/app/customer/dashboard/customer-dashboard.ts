import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/customer-home';
import { CartComponent } from '../cart/cart.component';
import { OrdersComponent } from '../orders/order';
import { ProfileComponent } from '../profile/profile';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, HomeComponent, CartComponent, OrdersComponent, ProfileComponent],
  templateUrl: './customer-dashboard.html',
  styleUrls: ['./customer-dashboard.css']
})
export class CustomerHomeComponent {
  activeSection = 'home';
  showProfileMenu = false;
  customerName = 'Jahnavi Lenka'; // fetch dynamically

  toggleProfile() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  getUserInitials(): string {
    if (!this.customerName) return '';
    const names = this.customerName.split(' ');
    const first = names[0]?.charAt(0).toUpperCase() || '';
    const last = names.length > 1 ? names[names.length-1].charAt(0).toUpperCase() : '';
    return first + last;
  }

  logout() {
    // Clear session (example)
    localStorage.clear();
    alert('Logged out successfully!');
    this.activeSection = 'home';
    this.showProfileMenu = false;
  }
}

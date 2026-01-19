import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../home/home';
import { ProductsComponent } from '../products/products';
import { CustomersComponent } from '../customers/customers';
import { OrderListComponent } from '../orders/orders';
import { FeedbackComponent } from '../feedback/feedback';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    ProductsComponent,
    CustomersComponent,
    OrderListComponent,
    FeedbackComponent
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {
  activeSection = 'home';

  switchSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    alert('Admin Logged Out Successfully');
  }
}

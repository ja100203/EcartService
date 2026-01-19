import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css']
})
export class OrderHistoryComponent {

  orderHistory = [
    { orderId: 'ORD0998', status: 'DELIVERED', date: '2025-12-20' },
    { orderId: 'ORD0999', status: 'CANCELLED', date: '2025-12-22' },
    { orderId: 'ORD1000', status: 'DELIVERED', date: '2025-12-25' }
  ];
}

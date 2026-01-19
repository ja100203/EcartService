import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrderListComponent {

  orders = [
    {
      orderId: 'ORD1001',
      customer: 'Amit',
      amount: 8500,
      date: '2026-01-10',
      status: 'PLACED',
      refunded: false
    },
    {
      orderId: 'ORD1002',
      customer: 'Neha',
      amount: 12000,
      date: '2026-01-11',
      status: 'SHIPPED',
      refunded: false
    },
    {
      orderId: 'ORD1003',
      customer: 'Rahul',
      amount: 5400,
      date: '2026-01-12',
      status: 'DELIVERED',
      refunded: false
    }
  ];

  statuses = ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

  updateStatus(order: any) {
    if (order.status === 'CANCELLED' || order.status === 'DELIVERED') {
      alert('Status cannot be updated');
      return;
    }
    alert(`Order ${order.orderId} status updated to ${order.status}`);
  }

  cancelOrder(order: any) {
    if (order.status === 'DELIVERED') {
      alert('Delivered orders cannot be cancelled');
      return;
    }

    if (confirm('Are you sure you want to cancel this order?')) {
      order.status = 'CANCELLED';
      this.processRefund(order);
    }
  }

  processRefund(order: any) {
    order.refunded = true;
    alert(`Refund of ₹${order.amount} processed`);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class DashboardComponent implements OnInit {

  orders = [
    { amount: 8500, status: 'DELIVERED', month: 'Jan' },
    { amount: 12000, status: 'CANCELLED', month: 'Jan' },
    { amount: 5600, status: 'DELIVERED', month: 'Feb' },
    { amount: 9200, status: 'DELIVERED', month: 'Feb' },
    { amount: 4800, status: 'PLACED', month: 'Mar' },
    { amount: 15000, status: 'DELIVERED', month: 'Mar' }
  ];

  totalOrders = 0;
  totalRevenue = 0;
  deliveredOrders = 0;
  cancelledOrders = 0;

  monthlySales: any = {};

  ngOnInit() {
    this.calculateMetrics();
    this.calculateMonthlySales();
  }

  calculateMetrics() {
    this.totalOrders = this.orders.length;

    this.orders.forEach(order => {
      if (order.status === 'DELIVERED') {
        this.totalRevenue += order.amount;
        this.deliveredOrders++;
      }
      if (order.status === 'CANCELLED') {
        this.cancelledOrders++;
      }
    });
  }

  calculateMonthlySales() {
    this.orders.forEach(order => {
      if (order.status === 'DELIVERED') {
        this.monthlySales[order.month] =
          (this.monthlySales[order.month] || 0) + order.amount;
      }
    });
  }

  get months() {
    return Object.keys(this.monthlySales);
  }
}

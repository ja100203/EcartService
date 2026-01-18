import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

/* ===================== MODELS ===================== */

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  orderId: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  totalAmount: number;
}

/* ===================== SERVICE ===================== */

@Injectable({ providedIn: 'root' })
export class OrdersService {

  /** Dummy orders (DEV / NO BACKEND) */
  private dummyOrders: Order[] = [
    {
      orderId: 'ORD-1001',
      date: new Date().toLocaleString(),
      status: 'Delivered',
      items: [
        { id: 1, name: 'Apple iPhone 14', price: 79999, quantity: 1, image: 'https://via.placeholder.com/80' }
      ],
      totalAmount: 79999
    },
    {
      orderId: 'ORD-1002',
      date: new Date().toLocaleString(),
      status: 'Shipped',
      items: [
        { id: 2, name: 'Samsung Galaxy S23', price: 69999, quantity: 1, image: 'https://via.placeholder.com/80' }
      ],
      totalAmount: 69999
    }
  ];

  private orders$ = new BehaviorSubject<Order[]>(this.loadInitialOrders());

  constructor() {
    this.orders$.subscribe(orders =>
      localStorage.setItem('orders', JSON.stringify(orders))
    );
  }

  /** UI always consumes this */
  getOrders(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  /** Used when placing order from cart */
  addOrder(order: Order) {
    this.orders$.next([order, ...this.orders$.getValue()]);
  }

  /** 🔑 KEY FIX: merge dummy + stored */
  private loadInitialOrders(): Order[] {
    const stored: Order[] =
      JSON.parse(localStorage.getItem('orders') || '[]');

    return [...this.dummyOrders, ...stored];
  }

  /** BACKEND READY (future) */
  fetchOrdersFromBackend(): Observable<Order[]> {
    // return this.http.get<Order[]>('/api/orders');
    return new Observable(obs => {
      obs.next([]);
      obs.complete();
    });
  }
}

/* ===================== COMPONENT ===================== */

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(data => {
      console.log('ORDERS DATA:', data);
      this.orders = data;
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  seller?: string;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>(this.loadCart());
  private orders$ = new BehaviorSubject<Order[]>(this.loadOrders());

  constructor() {
    this.cartItems$.subscribe(items => this.saveCart(items));
    this.orders$.subscribe(orders => this.saveOrders(orders));
  }

  /** ---------------- CART ---------------- */

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable(); // live updates
  }

  addToCart(product: CartItem) {
    const items = this.cartItems$.getValue();
    const existing = items.find(i => i.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.cartItems$.next([...items]);
  }

  removeFromCart(id: number) {
    const updated = this.cartItems$.getValue().filter(i => i.id !== id);
    this.cartItems$.next(updated);
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity <= 0) return this.removeFromCart(id);
    const items = this.cartItems$.getValue();
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.cartItems$.next([...items]);
    }
  }

  clearCart() {
    this.cartItems$.next([]);
  }

  getCartTotal(): number {
    return this.cartItems$.getValue().reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  /** ---------------- ORDERS ---------------- */

  getOrders(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  placeOrder() {
    const items = this.cartItems$.getValue();
    if (!items.length) return;

    const totalAmount = this.getCartTotal();
    const newOrder: Order = {
      orderId: 'ORD-' + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleString(),
      items: [...items],
      totalAmount
    };

    this.orders$.next([newOrder, ...this.orders$.getValue()]);
    this.clearCart();
  }

  /** ---------------- LOCAL STORAGE ---------------- */

  private saveCart(items: CartItem[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  private loadCart(): CartItem[] {
    const stored = JSON.parse(localStorage.getItem('cartItems') || '[]');

    if (stored.length) return stored;

    // Dummy products for now
    return [
      { id: 1, name: 'Apple iPhone 15', price: 89999, quantity: 1, image: 'https://via.placeholder.com/80', seller: 'Apple Store' },
      { id: 2, name: 'Samsung Galaxy S23', price: 69999, quantity: 1, image: 'https://via.placeholder.com/80', seller: 'Samsung Store' },
      { id: 3, name: 'Sony WH-1000XM5 Headphones', price: 24990, quantity: 1, image: 'https://via.placeholder.com/80', seller: 'Sony Official' },
    ];
  }

  private saveOrders(orders: Order[]) {
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  private loadOrders(): Order[] {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    if (stored.length) return stored;

    // Dummy order
    return [
      {
        orderId: 'ORD-123456',
        date: new Date().toLocaleString(),
        items: [
          { id: 1, name: 'Apple iPhone 14', price: 79999, quantity: 1, image: 'https://via.placeholder.com/80', seller: 'Apple Store' }
        ],
        totalAmount: 79999
      }
    ];
  }
}

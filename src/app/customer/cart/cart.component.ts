import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from './cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    });
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  increaseQty(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQty(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
  }

  proceedToPayment() {
    this.cartService.placeOrder();
    alert('Order placed successfully!');
  }
}

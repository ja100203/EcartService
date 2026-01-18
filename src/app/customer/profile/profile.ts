import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {
  user = {
    name: 'Jahnavi Lenka',
    email: 'jahnavi2003lenkageomail.com',
    phone: '+91 8926161696',
    address: '123, Green Park, Bhubaneswar, Odisha',
    avatar: 'https://via.placeholder.com/150'
  };

  addresses = [
    { label: 'Home', detail: '123, Green Park, Bhubaneswar, Odisha' },
    { label: 'Office', detail: '456, Tech Park, Bhubaneswar, Odisha' }
  ];

  paymentMethods = [
    { type: 'Credit Card', detail: '**** **** **** 1234' },
    { type: 'UPI', detail: 'jahnavi@upi' }
  ];
}

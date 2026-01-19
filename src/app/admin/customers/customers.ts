import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class CustomersComponent {
  customers = [
    { id:1, name:'Rahul', email:'r@gmail.com', city:'Delhi' },
    { id:2, name:'Anita', email:'a@gmail.com', city:'Mumbai' }
  ];
}

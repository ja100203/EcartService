import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-login.html',
  styleUrls: ['./customer-login.css']
})
export class CustomerLoginComponent {

  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      customerId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.errorMessage = 'Customer ID and Password are required!';
      return;
    }

    // Simulate login success with fake Customer ID = 123456
    if (this.loginForm.value.customerId === '123456' && this.loginForm.value.password === 'Password123') {
      this.router.navigate(['/customer/home']);
    } else {
      this.errorMessage = 'Invalid Customer ID or Password';
    }
  }
}

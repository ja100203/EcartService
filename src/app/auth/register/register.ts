import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,                       // ✅ REQUIRED
  imports: [CommonModule, ReactiveFormsModule], // ✅ REQUIRED
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  countries = ['India', 'USA', 'UK'];
  states = ['Odisha', 'Karnataka', 'Maharashtra'];
  zipCodes = ['751001', '560001', '400001'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      zip: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[1-9][0-9]{9,14}$')
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).*$')
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form';
      return;
    }

    const customerId = Math.floor(100000 + Math.random() * 900000);
    this.successMessage =
      `Registration successful! Your Customer ID is ${customerId}`;

    this.registerForm.reset();
    this.submitted = false;
  }
}

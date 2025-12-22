import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  loginID: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  contactNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: number = 1; // default User
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const user = {
      loginID: this.loginID,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      contactNumber: this.contactNumber,
      password: this.password,
      role: this.role
    };

    this.userService.register(user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Please login.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}

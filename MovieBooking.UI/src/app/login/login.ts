import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginID: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.loginID, this.password).subscribe({
      next: (response: any) => {
        // ✅ Save consistent values
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('role', response.user.role === 1 ? 'User' : 'Admin');

        alert('Login successful!');
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.errorMessage = 'Invalid login credentials';
      }
    });
  }
}

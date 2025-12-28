import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
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
        // ✅ Save values returned by backend
        localStorage.setItem('token', response.token);
        localStorage.setItem('userID', String(response.user.userID));
        localStorage.setItem('role', response.user.role === 1 ? 'User' : 'Admin');
        localStorage.setItem('loginID', response.user.loginID); // ✅ use loginID instead of username
        


        alert('Login successful!');
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.errorMessage = 'Invalid login credentials';
      }
    });
  }
}

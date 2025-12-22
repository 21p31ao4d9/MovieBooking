import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // ✅ Use getters so navbar always reflects latest localStorage values
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get role(): string | null {
    return localStorage.getItem('role'); // "User" or "Admin"
  }

  get username(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}

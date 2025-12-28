import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  loginID: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  forgotPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }

    this.http.post(
      'https://localhost:7092/api/v1.0/moviebooking/forgot-password',
      {
        loginID: this.loginID,
        newPassword: this.newPassword
      },
      { responseType: 'text' } // ✅ important: backend returns plain text
    ).subscribe({
      next: (res) => {
        this.message = res; // shows "Password reset successfully"
      },
      error: (err) => {
        this.message = err.error; // shows backend error like "User not found"
      }
    });
  }
}

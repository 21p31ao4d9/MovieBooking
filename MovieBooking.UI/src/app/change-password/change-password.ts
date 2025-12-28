import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  changePassword() {
    const loginID = localStorage.getItem('loginID'); // ✅ get logged-in user
    if (!loginID) {
      this.message = 'User not logged in';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'New passwords do not match';
      return;
    }

   this.http.post(
  'https://localhost:7092/api/v1.0/moviebooking/change-password',
  {
    loginID,
    oldPassword: this.oldPassword,
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword
  },
  { responseType: 'text' } //  important
).subscribe({
  next: (res) => {
    this.message = res; // shows "Password changed successfully"
  },
  error: (err) => {
    this.message = err.error; // shows backend error like "Old password is incorrect"
  }
});

  }
}

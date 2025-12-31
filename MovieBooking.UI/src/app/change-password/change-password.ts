import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  message: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      const errors = confirmPassword?.errors;
      if (errors) {
        delete errors['mismatch'];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
    return null;
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly');
      return;
    }

    const loginID = localStorage.getItem('loginID'); // ✅ get logged-in user
    if (!loginID) {
      this.message = 'User not logged in';
      this.toastr.error(this.message);
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    this.http.post(
      'https://localhost:7092/api/v1.0/moviebooking/change-password',
      {
        loginID,
        oldPassword,
        newPassword,
        confirmPassword
      },
      { responseType: 'text' } // important
    ).subscribe({
      next: (res) => {
        this.message = res; // e.g. "Password changed successfully"
        this.toastr.success(this.message);
        // ✅ reset fields after success
        this.changePasswordForm.reset();
      },
      error: (err) => {
        this.message = err.error; // e.g. "Old password is incorrect"
        this.toastr.error(this.message || 'Failed to change password ❌');
      }
    });
  }

  get oldPassword() { return this.changePasswordForm.get('oldPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword'); }
}

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.forgotPasswordForm = new FormGroup({
      loginID: new FormControl('', [Validators.required]),
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

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly');
      return;
    }

    const { loginID, newPassword } = this.forgotPasswordForm.value;

    this.http.post(
      'https://localhost:7092/api/v1.0/moviebooking/forgot-password',
      {
        loginID,
        newPassword
      },
      { responseType: 'text' } // ✅ backend returns plain text
    ).subscribe({
      next: (res) => {
        this.message = res; // e.g. "Password reset successfully"
        this.toastr.success(this.message); // 🎉 toast success
        // ✅ reset fields after success
        this.forgotPasswordForm.reset();
      },
      error: (err) => {
        this.message = err.error; // e.g. "User not found"
        this.toastr.error(this.message || 'Failed to reset password ❌'); // 🚨 toast error
      }
    });
  }

  get loginID() { return this.forgotPasswordForm.get('loginID'); }
  get newPassword() { return this.forgotPasswordForm.get('newPassword'); }
  get confirmPassword() { return this.forgotPasswordForm.get('confirmPassword'); }
}

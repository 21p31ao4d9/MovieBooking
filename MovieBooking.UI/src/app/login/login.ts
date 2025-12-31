import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      loginID: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    const { loginID, password } = this.loginForm.value;

    this.userService.login(loginID, password).subscribe({
      next: (response: any) => {
        // ✅ Save values returned by backend
        localStorage.setItem('token', response.token);
        localStorage.setItem('userID', String(response.user.userID));
        localStorage.setItem('role', response.user.role === 1 ? 'User' : 'Admin');
        localStorage.setItem('loginID', response.user.loginID);

        // ✅ Role-based navigation
        if (response.user.role === 1) {
          this.toastr.success('User login successful ✅');
          this.router.navigate(['/home']); // normal user → home page
        } else {
          this.toastr.success('Admin login successful 👑');
          this.router.navigate(['admin/dashboard']); // admin → dashboard
        }
      },
      error: () => {
        this.errorMessage = 'Invalid login credentials';
        this.toastr.error(this.errorMessage); // 🚨 toast error
      }
    });
  }

  get loginID() { return this.loginForm.get('loginID'); }
  get password() { return this.loginForm.get('password'); }
}

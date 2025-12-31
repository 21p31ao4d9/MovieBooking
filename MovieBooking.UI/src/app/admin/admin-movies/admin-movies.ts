import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-movies',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-movies.html',
  styleUrls: ['./admin-movies.css']
})
export class AdminMoviesComponent {
  movieName: string = '';
  theatreName: string = '';
  message: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  addMovie(form: any) {
    const payload = {
      movieName: this.movieName,
      theatreName: this.theatreName
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post(
      'https://localhost:7092/api/v1.0/moviebooking/add',
      payload,
      { headers, responseType: 'text' }
    ).subscribe({
      next: (res) => {
        this.message = res;
        this.toastr.success('Movie added successfully ✅'); // 🎉 toast instead of alert
        form.resetForm();
      },
      error: (err) => {
        this.message = err.error;
        this.toastr.error(this.message || 'Failed to add movie ❌'); // 🚨 toast error
        form.resetForm();
      }
    });
  }
}

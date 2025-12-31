import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-tickets.html',
  styleUrls: ['./user-tickets.css']
})
export class UserTicketsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private movieService: MovieService, private toastr: ToastrService) {}

  ngOnInit() {
    const username = localStorage.getItem('loginID'); // ✅ get logged-in user
    if (username) {
      this.movieService.getBookingsByUser(username).subscribe({
        next: (res: any[]) => {
          this.bookings = res;
          if (res.length > 0) {
            this.toastr.success(`Loaded ${res.length} bookings for "${username}" ✅`);
          } else {
            this.toastr.info('No bookings found 🎟️');
          }
        },
        error: (err) => {
          console.error('Failed to load bookings', err);
          this.toastr.error('Failed to load bookings ❌');
        }
      });
    } else {
      this.toastr.warning('User not logged in ⚠️');
    }
  }
}

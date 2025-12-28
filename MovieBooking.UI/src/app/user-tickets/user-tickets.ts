import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie';

@Component({
  selector: 'app-user-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-tickets.html',
  styleUrls: ['./user-tickets.css']
})
export class UserTicketsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    const username = localStorage.getItem('loginID'); // ✅ get logged-in user
    if (username) {
      this.movieService.getBookingsByUser(username).subscribe({
        next: (res: any[]) => {
          this.bookings = res;
        },
        error: (err) => console.error('Failed to load bookings', err)
      });
    }
  }
}

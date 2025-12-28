import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-ticket.html',
  styleUrls: ['./admin-ticket.css']
})
export class AdminTicketsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadBookings('Avatar'); // ✅ example movie name
  }

  loadBookings(movieName: string) {
    this.movieService.getBookingsByMovie(movieName).subscribe({
      next: (res: any[]) => {
        this.bookings = res;
      },
      error: (err) => console.error('Failed to load bookings', err)
    });
  }
}

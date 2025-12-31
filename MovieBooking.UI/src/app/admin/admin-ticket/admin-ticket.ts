import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-ticket.html',
  styleUrls: ['./admin-ticket.css']
})
export class AdminTicketsComponent implements OnInit {
  bookings: any[] = [];
  movies: string[] = [];
  selectedMovie: string = '';

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (res: any[]) => {
        this.movies = res.map(m => m.movieName);
        if (this.movies.length > 0) {
          // ✅ defer update to avoid ExpressionChangedAfterItHasBeenCheckedError
          setTimeout(() => {
            this.selectedMovie = this.movies[0];
            this.loadBookings(this.selectedMovie);
          });
        }
      },
      error: (err) => {
        console.error('Failed to load movies', err);
        this.toastr.error('Failed to load movies ❌');
      }
    });
  }

  loadBookings(movieName: string) {
    this.movieService.getBookingsByMovie(movieName).subscribe({
      next: (res: any[]) => {
        this.bookings = res;
        this.toastr.success(`Loaded ${res.length} bookings for "${movieName}" ✅`);
        this.cdRef.detectChanges(); // ✅ ensure template re-check
      },
      error: (err) => {
        console.error('Failed to load bookings', err);
        this.toastr.error('Failed to load bookings ❌');
      }
    });
  }
}

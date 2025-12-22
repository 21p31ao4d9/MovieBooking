import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieService } from '../services/movie';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchTerm: string = '';

  constructor(private movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data: any[]) => {
        this.movies = data;
        this.filteredMovies = data; // ✅ initialize filter
      },
      error: (err: any) => console.error('Failed to load movies', err)
    });
  }

  filterMovies(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredMovies = this.movies.filter(
      m =>
        m.movieName.toLowerCase().includes(term) ||
        m.theatreName.toLowerCase().includes(term)
    );
  }

  openBookingDialog(movie: any) {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '640px',
      data: { movie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadMovies();
      }
    });
  }
}

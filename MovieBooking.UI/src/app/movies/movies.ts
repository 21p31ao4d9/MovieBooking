import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';   // ✅ import Router
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
  isLoggedIn: boolean = !!localStorage.getItem('token');  // ✅ check login status

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private router: Router   // ✅ inject Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data: any[]) => {
        this.movies = data;
        this.filteredMovies = data;
      },
      error: (err: any) => console.error('Failed to load movies', err)
    });
  }

  filterMovies(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredMovies = this.movies.filter(
      m =>
        m.movieName.toLowerCase().includes(term) ||
        (m.theatreName && m.theatreName.toLowerCase().includes(term))
    );
  }

  openBookingDialog(movie: any) {
    // ✅ If not logged in, redirect to login page
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Otherwise open booking dialog
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '640px',
      data: {
        movie: {
          movieID: movie.movieID,
          movieName: movie.movieName
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadMovies();
      }
    });
  }
}

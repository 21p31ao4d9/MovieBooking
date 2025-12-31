import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog';
import { ToastrService } from 'ngx-toastr';

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
  isLoggedIn: boolean = !!localStorage.getItem('token');

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef   // ✅ inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data: any[]) => {
        // ✅ wrap in setTimeout OR call detectChanges
        setTimeout(() => {
          this.movies = data;
          this.filteredMovies = data;
          this.toastr.success(`Loaded ${data.length} movies 🎬`);
          this.cdr.detectChanges(); // ✅ force Angular to re-check
        });
      },
      error: (err: any) => {
        console.error('Failed to load movies', err);
        this.toastr.error('Failed to load movies ❌');
      }
    });
  }

  filterMovies(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredMovies = this.movies.filter(
      m =>
        m.movieName.toLowerCase().includes(term) ||
        (m.theatreName && m.theatreName.toLowerCase().includes(term))
    );

    if (this.filteredMovies.length === 0) {
      this.toastr.info('No movies match your search 🔍');
    }
  }

  openBookingDialog(movie: any) {
    if (!this.isLoggedIn) {
      this.toastr.warning('Please login to book tickets ⚠️');
      this.router.navigate(['/login']);
      return;
    }

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
        this.toastr.success(`Booking confirmed for "${movie.movieName}" ✅`);
        this.loadMovies();
      } else if (result === 'error') {
        this.toastr.error(`Booking failed for "${movie.movieName}" ❌`);
      }
    });
  }
}

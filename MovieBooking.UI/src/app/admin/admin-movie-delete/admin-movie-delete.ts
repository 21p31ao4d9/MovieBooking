import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-movie-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-movie-delete.html',
  styleUrls: ['./admin-movie-delete.css']
})
export class AdminMovieDeleteComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchTerm: string = '';
  message: string = '';

  constructor(private movieService: MovieService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filteredMovies = data;
      },
      error: () => {
        this.message = 'Failed to load movies';
        this.toastr.error(this.message);
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
  }

  // ❌ Delete movie
  deleteMovie(movie: any): void {
    if (!confirm(`Are you sure you want to delete "${movie.movieName}" from ${movie.theatreName}?`)) {
      return;
    }

    this.movieService.deleteMovie(movie.movieName, movie.movieID).subscribe({
      next: () => {
        this.toastr.success(`Movie "${movie.movieName}" deleted successfully ✅`);
        this.loadMovies(); // refresh list
      },
      error: (err) => {
        this.message = err.error;
        this.toastr.error(this.message || 'Failed to delete movie ❌');
      }
    });
  }

  // 🔄 Update movie status
  updateStatus(movie: any): void {
    this.movieService.updateMovieStatus(movie.movieID).subscribe({
      next: () => {
        this.toastr.success(`Status updated for "${movie.movieName}" 🔄`);
        this.loadMovies(); // refresh list
      },
      error: (err) => {
        this.message = err.error;
        this.toastr.error(this.message || 'Failed to update status ❌');
      }
    });
  }
}

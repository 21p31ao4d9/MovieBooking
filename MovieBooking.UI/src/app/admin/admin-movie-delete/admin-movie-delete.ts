import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';

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

  constructor(private movieService: MovieService) {}

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

  deleteMovie(movie: any): void {
    if (!confirm(`Are you sure you want to delete "${movie.movieName}" from ${movie.theatreName}?`)) {
      return;
    }

    this.movieService.deleteMovie(movie.movieName, movie.movieID).subscribe({
      next: (res) => {
        alert("Movie deleted successfully ✅");
        this.message = res;
        this.loadMovies(); // refresh list
      },
      error: (err) => {
        this.message = err.error;
        alert(this.message);
      }
    });
  }
}

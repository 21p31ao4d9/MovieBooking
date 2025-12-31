import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = { availableTickets: 0, soldTickets: 0 }; // ✅ safe default
  movies: any[] = [];
  error: string = '';

  @ViewChild('ticketsChart', { static: false }) ticketsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bookingsChart', { static: false }) bookingsChart!: ElementRef<HTMLCanvasElement>;

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadMovies();
  }

  private loadDashboard(): void {
    this.movieService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.cdRef.detectChanges(); // ✅ trigger re-check
        this.renderPieChart();
      },
      error: () => {
        this.error = 'Failed to load dashboard stats';
        this.toastr.error(this.error);
      }
    });
  }

  private loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.cdRef.detectChanges(); // ✅ trigger re-check
        this.renderBarChart();
      },
      error: () => {
        this.error = 'Failed to load movie data';
        this.toastr.error(this.error);
      }
    });
  }

  // 🔄 Update movie status
  updateStatus(movie: any): void {
    this.movieService.updateMovieStatus(movie.movieID).subscribe({
      next: () => {
        this.toastr.success(`Status updated for "${movie.movieName}" ✅`);
        this.loadMovies();
      },
      error: (err) => {
        this.toastr.error(err.error || 'Failed to update status ❌');
      }
    });
  }

  // ❌ Delete movie
  deleteMovie(movie: any): void {
    if (!confirm(`Are you sure you want to delete "${movie.movieName}"?`)) return;

    this.movieService.deleteMovie(movie.movieName, movie.movieID).subscribe({
      next: () => {
        this.toastr.success(`Movie "${movie.movieName}" deleted successfully ✅`);
        this.loadMovies();
      },
      error: (err) => {
        this.toastr.error(err.error || 'Failed to delete movie ❌');
      }
    });
  }

  renderPieChart(): void {
    const ctx = this.ticketsChart?.nativeElement?.getContext('2d');
    if (!ctx || !this.stats) return;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Available Tickets', 'Sold Tickets'],
        datasets: [{
          data: [this.stats.availableTickets, this.stats.soldTickets],
          backgroundColor: ['#2ecc71', '#e74c3c']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  renderBarChart(): void {
    const ctx = this.bookingsChart?.nativeElement?.getContext('2d');
    if (!ctx || this.movies.length === 0) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.movies.map(m => m.movieName),
        datasets: [{
          label: 'Bookings per Movie',
          data: this.movies.map(m =>
            m.totalTickets && m.availableTickets != null
              ? m.totalTickets - m.availableTickets
              : 0
          ),
          backgroundColor: '#3498db'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

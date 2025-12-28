import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewChecked {
  stats: any = null;
  movies: any[] = [];
  error: string = '';
  chartsDrawn = false;

  @ViewChild('ticketsChart', { static: false }) ticketsChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bookingsChart', { static: false }) bookingsChart!: ElementRef<HTMLCanvasElement>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getDashboardStats().subscribe({
      next: (data) => { this.stats = data; },
      error: (err) => {
        this.error = 'Failed to load dashboard stats';
        console.error(err);
      }
    });

    this.movieService.getMovies().subscribe({
      next: (data) => { this.movies = data; },
      error: (err) => {
        this.error = 'Failed to load movie data';
        console.error(err);
      }
    });
  }

  ngAfterViewChecked(): void {
    // Render charts once data and canvases are ready
    if (this.stats && this.movies.length > 0 && !this.chartsDrawn) {
      this.renderPieChart();
      this.renderBarChart();
      this.chartsDrawn = true;
    }
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = 'https://localhost:7092/api/v1.0/moviebooking';

  constructor(private http: HttpClient) {}

  // 🔑 Helper: attach JWT token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // 🎬 Get all movies
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() });
  }

  // ➕ Add a new movie (Admin only)
  addMovie(movie: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, movie, { headers: this.getAuthHeaders() });
  }

  // ❌ Delete a movie (Admin only)
  deleteMovie(movieName: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${movieName}/delete/${id}`, { headers: this.getAuthHeaders() });
  }


  updateMovieStatus(movieId: number): Observable<any> 
  { 
    return this.http.put(`${this.apiUrl}/${movieId}/update-status`, {}, { headers: this.getAuthHeaders() }); 
  }
  

  // 🎟️ Add a booking for a movie
  addBooking(movieId: number, booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${movieId}/add`, booking, { headers: this.getAuthHeaders() });
  }

  // 📌 Get all bookings for a movie
  getBookingsByMovie(movieName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movie/${movieName}/bookings`, {
      headers: this.getAuthHeaders()
    });
  }

  // 👤 Get bookings by username
  getBookingsByUser(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${username}/bookings`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🎟️ Get all 50 seats with booking status
  getSeatsByMovie(movieID: number): Observable<{ seatNumber: string, isBooked: boolean }[]> {
    return this.http.get<{ seatNumber: string, isBooked: boolean }[]>(`${this.apiUrl}/${movieID}/seats`, {
      headers: this.getAuthHeaders()
    });
  }

  // 📊 ✅ Get dashboard stats (Admin only)
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/stats`, { headers: this.getAuthHeaders() });
  }
}

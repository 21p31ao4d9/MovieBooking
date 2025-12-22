import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private apiUrl = 'https://localhost:7092/api/v1.0/moviebooking';

  constructor(private http: HttpClient) {}

  // Get bookings for a user
  getUserBookings(userName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getbooking/${userName}`);
  }

  // Get all bookings (Admin only)
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allbookings`);
  }

  // Book a ticket
  bookTicket(movieId: number, userName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/book/${movieId}`, { userName });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieService } from '../services/movie';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-dialog.html',
  styleUrls: ['./booking-dialog.css']
})
export class BookingDialogComponent implements OnInit {
  seatRows: string[][] = [];
  bookedSeats: Set<string> = new Set();
  selectedSeats: string[] = [];

  constructor(
    private movieService: MovieService,
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movie: any }
  ) {}

  ngOnInit() {
    this.generateSeats(5, 10); // A–E, 1–10
    this.loadBookedSeats();    // ✅ fetch booked seats before rendering
  }

  generateSeats(rows: number, cols: number) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.seatRows = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 1; c <= cols; c++) {
        row.push(`${alphabet[r]}${c}`);
      }
      this.seatRows.push(row);
    }
  }

  loadBookedSeats() {
    this.movieService.getBookingsByMovie(this.data.movie.movieName).subscribe({
      next: (tickets: any[]) => {
        const allSeats = tickets
          .map(t => t.seatNumbers.replace(/[.,]/g, ',').split(','))
          .flat()
          .map(s => s.trim());
        this.bookedSeats = new Set(allSeats); // ✅ store in Set for fast lookup
      },
      error: err => console.error('Failed to load booked seats', err)
    });
  }

  onSeatClick(seat: string) {
    if (this.bookedSeats.has(seat)) {
      alert(`Seat ${seat} is already booked.`);
      return;
    }
    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  confirmBooking() {
    const userID = Number(localStorage.getItem('userID'));
    const quantity = this.selectedSeats.length;

    if (quantity === 0) {
      alert('Please select at least one seat.');
      return;
    }

    const bookingPayload = {
      userID,
      movieID: this.data.movie.movieID,
      quantity,
      seatNumbers: this.selectedSeats.join(',')
    };

    this.movieService.addBooking(this.data.movie.movieName, bookingPayload).subscribe({
      next: () => {
        alert('Booking successful!');
        this.selectedSeats = [];
        this.loadBookedSeats(); // ✅ refresh grid
        this.dialogRef.close('success');
      },
      error: err => console.error('Booking failed', err)
    });
  }
}

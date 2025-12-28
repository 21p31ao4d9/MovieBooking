using MovieBookingApp.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;

namespace MovieBookingApp.Models
{
    /// <summary>
    /// Represents a movie available for booking in a specific theatre.
    /// </summary>
    public class Movie
    {
        [Key] // Primary Key
        public int MovieID { get; set; }

        [Required(ErrorMessage = "Movie name is required")]
        [StringLength(100)]
        public string MovieName { get; set; }

        [Required(ErrorMessage = "Theatre name is required")]
        [StringLength(100)]
        public string TheatreName { get; set; }

        [Range(1, 1000, ErrorMessage = "Total tickets must be 50")]
        public int TotalTickets { get; set; } = 50;

        
        public int AvailableTickets { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } // "Available", "BOOK ASAP", "SOLD OUT"

        // Navigation property: One movie can have many tickets booked
        public ICollection<Ticket> Tickets { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieBookingApp.Models
{
    /// <summary>
    /// Represents a ticket booking made by a user for a movie.
    /// </summary>
    public class Ticket
    {
        [Key] // Primary Key
        public int TicketID { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserID { get; set; } // FK → User

        [Required]
        [ForeignKey("Movie")]
        public int MovieID { get; set; } // FK → Movie

        [Range(1, 10, ErrorMessage = "You can book between 1 and 10 tickets")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Seat numbers are required")]
        public string SeatNumbers { get; set; } // Comma-separated seats

        [Required]
        [StringLength(20)]
        public string Status { get; set; } // "Confirmed", "Cancelled"

        // Navigation properties
        public User User { get; set; }
        public Movie Movie { get; set; }
    }
}
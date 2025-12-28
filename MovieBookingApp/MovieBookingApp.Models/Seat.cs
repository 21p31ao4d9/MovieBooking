using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieBookingApp.Models
{
    public class Seat
    {
        [Key]
        public int SeatID { get; set; }          // Primary key

        [Required]
        public int MovieID { get; set; }         // Foreign key to Movies

        [Required]
        [MaxLength(10)]
        public string SeatNumber { get; set; }   // e.g. "A1", "B5"

        
    }
}

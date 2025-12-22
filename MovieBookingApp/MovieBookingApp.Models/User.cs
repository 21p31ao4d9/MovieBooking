using MovieBookingApp.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;

namespace MovieBookingApp.Models
{
    /// <summary>
    /// Represents a user in the system (either normal user or admin).
    /// </summary>
    public enum UserRole
    {
        User = 1,
        Admin = 2
    }
    public class User
    {
        [Key] // Primary Key
        public int UserID { get; set; }

        [Required(ErrorMessage = "First name is required")]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Login ID is required")]
        [StringLength(30)]
        public string LoginID { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 8,
            ErrorMessage = "Password must be at least 8 characters")]
        public string PasswordHash { get; set; } // Store hashed password

        [Required(ErrorMessage = "Contact number is required")]
        [Phone(ErrorMessage = "Invalid phone number")]
        public string ContactNumber { get; set; }

        [Required]
        public UserRole Role { get; set; } // Enum instead of string

        // Navigation property: One user can book many tickets
        public ICollection<Ticket> Tickets { get; set; }
    }
}
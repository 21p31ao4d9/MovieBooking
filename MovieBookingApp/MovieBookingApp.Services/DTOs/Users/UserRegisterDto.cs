using MovieBookingApp.Models;

namespace MovieBookingApp.Services.DTOs.Users
{
    public class UserRegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string LoginID { get; set; }
        public string Password { get; set; }
        public string ContactNumber { get; set; }
        public UserRole Role { get; set; }
    }
}

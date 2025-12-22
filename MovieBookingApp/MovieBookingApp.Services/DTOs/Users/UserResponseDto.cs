using MovieBookingApp.Models;

namespace MovieBookingApp.Services.DTOs.Users
{
    public class UserResponseDto
    {
        public int UserID { get; set; }
        public string LoginID { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
    }
}

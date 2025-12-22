using MovieBookingApp.Models;
using MovieBookingApp.Services.DTOs.Users;
using MovieBookingApp.Services.Interfaces;
using System.Linq;

namespace MovieBookingApp.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly MovieBookingContext _context;

        public UserService(MovieBookingContext context)
        {
            _context = context;
        }

        public UserResponseDto Register(UserRegisterDto dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                LoginID = dto.LoginID,
                PasswordHash = dto.Password,
                ContactNumber = dto.ContactNumber,
                Role = dto.Role // use provided role
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return new UserResponseDto
            {
                UserID = user.UserID,
                LoginID = user.LoginID,
                Email = user.Email,
                Role = user.Role
            };
        }


        public UserResponseDto Login(UserLoginDto dto)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.LoginID == dto.LoginID && u.PasswordHash == dto.Password);

            if (user == null) return null;

            return new UserResponseDto
            {
                UserID = user.UserID,
                LoginID = user.LoginID,
                Email = user.Email,
                Role = user.Role
            };
        }
    }
}

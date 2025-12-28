using MovieBookingApp.Dtos.Users;
using MovieBookingApp.Models;
using MovieBookingApp.Services.DTOs.Users;

namespace MovieBookingApp.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        UserResponseDto Register(UserRegisterDto dto);
        UserResponseDto Login(UserLoginDto dto);

        bool ChangePassword(ChangePasswordRequest request); 
        bool ForgotPassword(ForgotPasswordRequest request);
    }
}

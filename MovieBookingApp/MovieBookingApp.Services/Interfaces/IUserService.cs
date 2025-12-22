using MovieBookingApp.Services.DTOs.Users;

namespace MovieBookingApp.Services.Interfaces
{
    public interface IUserService
    {
        UserResponseDto Register(UserRegisterDto dto);
        UserResponseDto Login(UserLoginDto dto);
    }
}

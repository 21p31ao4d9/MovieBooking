using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MovieBookingApp.Services.Interfaces;
using MovieBookingApp.Services.DTOs.Users;
using MovieBookingApp.API.Authentication;

namespace MovieBookingApp.API.Controllers
{
    [ApiController]
    [Route("api/v1.0/moviebooking")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtTokenGenerator _tokenGenerator;

        public UsersController(IUserService userService, IOptions<JwtSettings> settings)
        {
            _userService = userService;
            _tokenGenerator = new JwtTokenGenerator(settings.Value);
        }

        // POST /api/v1.0/moviebooking/register
        [HttpPost("register")]
        public IActionResult Register(UserRegisterDto dto)
        {
            var user = _userService.Register(dto);
            return Ok(user);
        }

        // GET /api/v1.0/moviebooking/login
        [HttpGet("login")]
        public IActionResult Login([FromQuery] UserLoginDto dto)
        {
            var user = _userService.Login(dto);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _tokenGenerator.GenerateToken(user.UserID.ToString(), user.Role.ToString());
            return Ok(new { Token = token, User = user });
        }

        // GET /api/v1.0/moviebooking/{username}/forgot
        [HttpGet("{username}/forgot")]
        public IActionResult ForgotPassword(string username)
        {
            // Demo: return placeholder (real app would send email)
            return Ok($"Password reset link sent to user: {username}");
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MovieBookingApp.API.Authentication;
using MovieBookingApp.Dtos.Users;
using MovieBookingApp.Services.DTOs.Users;
using MovieBookingApp.Services.Implementations;
using MovieBookingApp.Services.Interfaces;

namespace MovieBookingApp.API.Controllers
{
    [ApiController]
    [Route("api/v1.0/moviebooking")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMovieService _movieService;
        private readonly ITicketService _ticketService;
        private readonly JwtTokenGenerator _tokenGenerator;
        public UsersController(IUserService userService, IMovieService movieService, ITicketService ticketService, IOptions<JwtSettings> settings) 
        {
            _userService = userService;
            _movieService = movieService;
            _ticketService = ticketService;
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

        [HttpPost("change-password")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var success = _userService.ChangePassword(request);

            

            return Ok("Password changed successfully");
        }







        // ✅ POST /api/v1.0/moviebooking/forgot-password
        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var result = _userService.ForgotPassword(request);
            if (!result) return NotFound("User not found");
            return Ok("Password reset successfully");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("dashboard/stats")]
        public IActionResult GetDashboardStats()
        {
            try
            {
                var stats = new
                {
                    TotalUsers = _userService.GetAllUsers().Count(),
                    TotalMovies = _movieService.GetTotalMovies(),
                    TotalBookings = _ticketService.GetAllTickets().Count(),
                    AvailableTickets = _movieService.GetAvailableTickets(),
                    SoldTickets = _movieService.GetSoldTickets()
                };
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Dashboard error: {ex.Message}");
            }
        }



    }
}

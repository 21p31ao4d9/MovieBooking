using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieBookingApp.Services.DTOs.Movies;
using MovieBookingApp.Services.Interfaces;

namespace MovieBookingApp.API.Controllers
{
    [ApiController]
    [Route("api/v1.0/moviebooking")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        // GET /api/v1.0/moviebooking/all
        [HttpGet("all")]
        public IActionResult GetAllMovies()
        {
            return Ok(_movieService.GetAllMovies());
        }

        // GET /api/v1.0/moviebooking/movies/search/{moviename}
        [HttpGet("movies/search/{moviename}")]
        public IActionResult GetMovieByName(string moviename)
        {
            var movie = _movieService.GetMovieByName(moviename);
            if (movie == null) return NotFound();
            return Ok(movie);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public IActionResult AddMovie([FromBody] MovieCreateDto dto)
        {
            if (dto == null) return BadRequest("Invalid movie data");

            try
            {
                var createdMovie = _movieService.AddMovie(dto);
                return Content("Movie added successfully", "text/plain");// ✅ plain text response
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message); // 409 Conflict → "Movie already exists in this theatre"
            }
            catch (DbUpdateException)
            {
                return Conflict("Duplicate movie entry not allowed");
            }
        }



        // DELETE /api/v1.0/moviebooking/{moviename}/delete/{id}
        [Authorize(Roles = "Admin")]
        [HttpDelete("{moviename}/delete/{id}")]
        public IActionResult DeleteMovie(string moviename, int id)
        {
            _movieService.DeleteMovie(id);
            return NoContent();
        }

        // GET /api/v1.0/moviebooking/movie/{moviename}/bookings
        [HttpGet("movie/{moviename}/bookings")]
        public IActionResult GetBookingsByMovie(string moviename)
        {
            var bookings = _movieService.GetBookingsByMovie(moviename);
            return Ok(bookings);
        }

        // GET /api/v1.0/moviebooking/user/{username}/bookings
        [Authorize(Roles = "User")]
        [HttpGet("user/{username}/bookings")]
        public IActionResult GetBookingsByUser(string username)
        {
            var bookings = _movieService.GetBookingsByUser(username);
            return Ok(bookings);
        }

        // ✅ GET /api/v1.0/moviebooking/{movieId}/seats
        // Returns all 50 seats with booking status
        [HttpGet("{movieId}/seats")]
        public IActionResult GetSeats(int movieId)
        {
            var seats = _movieService.GetAvailableSeatsForMovie(movieId); // returns List<SeatStatusDto>
            return Ok(seats);
        }
    }
}

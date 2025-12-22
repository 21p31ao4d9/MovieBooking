using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        // POST /api/v1.0/moviebooking/add
        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public IActionResult AddMovie([FromBody] MovieCreateDto dto)
        {
            if (dto == null) return BadRequest("Invalid movie data");

            var createdMovie = _movieService.AddMovie(dto);
            return CreatedAtAction(nameof(GetMovieByName), new { moviename = createdMovie.MovieName }, createdMovie);
        }

        // DELETE /api/v1.0/moviebooking/{moviename}/delete/{id}
        [Authorize(Roles = "Admin")]
        [HttpDelete("{moviename}/delete/{id}")]
        public IActionResult DeleteMovie(string moviename, int id)
        {
            _movieService.DeleteMovie(id);
            return NoContent();
        }

        
        [HttpGet("movie/{moviename}/bookings")]
        public IActionResult GetBookingsByMovie(string moviename)
        {
            var bookings = _movieService.GetBookingsByMovie(moviename);
            return Ok(bookings);
        }

        // User: bookings by username
        [Authorize(Roles = "User")]
        [HttpGet("user/{username}/bookings")]
        public IActionResult GetBookingsByUser(string username)
        {
            var bookings = _movieService.GetBookingsByUser(username);
            return Ok(bookings);
        }



    }
}

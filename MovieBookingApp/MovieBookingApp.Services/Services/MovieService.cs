using MovieBookingApp.Models;
using MovieBookingApp.Services.DTOs.Movies;
using MovieBookingApp.Services.DTOs.Tickets;
using MovieBookingApp.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MovieBookingApp.Services.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly MovieBookingContext _context;

        public MovieService(MovieBookingContext context)
        {
            _context = context;
        }

        public IEnumerable<MovieDto> GetAllMovies()
        {
            return _context.Movies.Select(m => new MovieDto
            {
                MovieID = m.MovieID,
                MovieName = m.MovieName,
                TheatreName = m.TheatreName,
                TotalTickets = m.TotalTickets,
                AvailableTickets = m.AvailableTickets,
                Status = m.Status
            }).ToList();
        }

        public MovieDto GetMovieByName(string name)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.MovieName == name);
            if (movie == null) return null;

            return new MovieDto
            {
                MovieID = movie.MovieID,
                MovieName = movie.MovieName,
                TheatreName = movie.TheatreName,
                TotalTickets = movie.TotalTickets,
                AvailableTickets = movie.AvailableTickets,
                Status = movie.Status
            };
        }


        public MovieDto AddMovie(MovieCreateDto dto)
        {
            // Check for duplicates (MovieName + TheatreName must be unique)
            var existing = _context.Movies
                .FirstOrDefault(m => m.MovieName == dto.MovieName && m.TheatreName == dto.TheatreName);

            if (existing != null)
                throw new InvalidOperationException("Movie already exists in this theatre");

            var movie = new Movie
            {
                MovieName = dto.MovieName,
                TheatreName = dto.TheatreName,
                TotalTickets = 50,          // always enforce 50 seats
                AvailableTickets = 50,
                Status = "Available"
            };

            _context.Movies.Add(movie);
            _context.SaveChanges();

            return new MovieDto
            {
                MovieID = movie.MovieID,
                MovieName = movie.MovieName,
                TheatreName = movie.TheatreName,
                TotalTickets = movie.TotalTickets,
                AvailableTickets = movie.AvailableTickets,
                Status = movie.Status
            };
        }


        public void UpdateMovieStatus(int movieId, string status)
        {
            var movie = _context.Movies.Find(movieId);
            if (movie != null)
            {
                movie.Status = status;
                _context.SaveChanges();
            }
        }

        public void DeleteMovie(int movieId)
        {
            var movie = _context.Movies.Find(movieId);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
                _context.SaveChanges();
            }
        }

        public IEnumerable<TicketDto> GetBookingsByMovie(string movieName)
        {
            var movie = _context.Movies.FirstOrDefault(m => m.MovieName == movieName);
            if (movie == null) return Enumerable.Empty<TicketDto>();

            return _context.Tickets
                .Where(t => t.MovieID == movie.MovieID)
                .Select(t => new TicketDto
                {
                    TicketID = t.TicketID,
                    UserID = t.UserID,
                    MovieID = t.MovieID,
                    Quantity = t.Quantity,
                    SeatNumbers = t.SeatNumbers,
                    Status = t.Status,
                    MovieName = movie.MovieName,
                    LoginID = _context.Users.Where(u => u.UserID == t.UserID).Select(u => u.LoginID).FirstOrDefault()
                })
                .ToList();
        }

        // ✅ New logic: Get bookings by username
        public IEnumerable<TicketDto> GetBookingsByUser(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.LoginID == username);
            if (user == null) return Enumerable.Empty<TicketDto>();

            return _context.Tickets
                .Where(t => t.UserID == user.UserID)
                .Select(t => new TicketDto
                {
                    TicketID = t.TicketID,
                    UserID = t.UserID,
                    MovieID = t.MovieID,
                    Quantity = t.Quantity,
                    SeatNumbers = t.SeatNumbers,
                    Status = t.Status
                })
                .ToList();
        }

        // ✅ Always generate 50 seats and subtract booked ones
        public List<string> GetAvailableSeatsForMovie(int movieId)
        {
            // Example: 5 rows (A–E), 10 seats each = 50 seats
            var allSeats = Enumerable.Range(0, 5)
                .SelectMany(r => Enumerable.Range(1, 10)
                    .Select(c => $"{(char)('A' + r)}{c}"))
                .ToList();

            // booked seats stored in Tickets.SeatNumbers as comma-separated string
            var bookedSeats = _context.Tickets
                .Where(t => t.MovieID == movieId)
                .AsEnumerable()
                .SelectMany(t => t.SeatNumbers.Split(','))
                .Select(s => s.Trim())
                .ToList();

            return allSeats.Except(bookedSeats).ToList();
        }

        public int GetTotalMovies()
        {
            // Count all movies in the database
            return _context.Movies.Count();
        }

        public int GetAvailableTickets()
        {
            // Sum of all available tickets across movies
            return _context.Movies.Sum(m => m.AvailableTickets);
        }

        public int GetSoldTickets()
        {
            // For each movie: TotalTickets - AvailableTickets = SoldTickets
            return _context.Movies.Sum(m => m.TotalTickets - m.AvailableTickets);
        }

    }
}

using MovieBookingApp.Services.DTOs.Movies;
using MovieBookingApp.Services.DTOs.Tickets;
using System.Collections.Generic;

namespace MovieBookingApp.Services.Interfaces
{
    public interface IMovieService
    {
        IEnumerable<MovieDto> GetAllMovies();
        MovieDto GetMovieByName(string name);
        MovieDto AddMovie(MovieCreateDto dto);
        void UpdateMovieStatus(int movieId, string status);
        void DeleteMovie(int movieId);

        IEnumerable<TicketDto> GetBookingsByMovie(string movieName);
        IEnumerable<TicketDto> GetBookingsByUser(string username);
    }
}

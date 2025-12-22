using MovieBookingApp.Models;
using MovieBookingApp.Services.DTOs.Tickets;
using MovieBookingApp.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace MovieBookingApp.Services.Implementations
{
    public class TicketService : ITicketService
    {
        private readonly MovieBookingContext _context;

        public TicketService(MovieBookingContext context)
        {
            _context = context;
        }

        public TicketDto BookTicket(TicketCreateDto dto)
        {
            var movie = _context.Movies.Find(dto.MovieID);
            if (movie == null || movie.AvailableTickets < dto.Quantity)
                return null;

            // Update movie availability
            movie.AvailableTickets -= dto.Quantity;
            movie.Status = movie.AvailableTickets == 0 ? "SOLD OUT" :
                           movie.AvailableTickets <= movie.TotalTickets / 2 ? "BOOK ASAP" : "Available";

            var ticket = new Ticket
            {
                UserID = dto.UserID,
                MovieID = dto.MovieID,
                Quantity = dto.Quantity,
                SeatNumbers = dto.SeatNumbers,
                Status = "Confirmed"
            };

            _context.Tickets.Add(ticket);
            _context.SaveChanges();

            return new TicketDto
            {
                TicketID = ticket.TicketID,
                UserID = ticket.UserID,
                MovieID = ticket.MovieID,
                Quantity = ticket.Quantity,
                SeatNumbers = ticket.SeatNumbers,
                Status = ticket.Status
            };
        }

        public IEnumerable<TicketDto> GetTicketsByUser(int userId)
        {
            return _context.Tickets
                .Where(t => t.UserID == userId)
                .Select(t => new TicketDto
                {
                    TicketID = t.TicketID,
                    UserID = t.UserID,
                    MovieID = t.MovieID,
                    Quantity = t.Quantity,
                    SeatNumbers = t.SeatNumbers,
                    Status = t.Status
                }).ToList();
        }
    }
}

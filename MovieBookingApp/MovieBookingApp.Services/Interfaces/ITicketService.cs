using MovieBookingApp.Services.DTOs.Tickets;
using System.Collections.Generic;

namespace MovieBookingApp.Services.Interfaces
{
    public interface ITicketService
    {
        TicketDto BookTicket(TicketCreateDto dto);
        IEnumerable<TicketDto> GetTicketsByUser(int userId);
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieBookingApp.Services.Interfaces;
using MovieBookingApp.Services.DTOs.Tickets;

namespace MovieBookingApp.API.Controllers
{
    [ApiController]
    [Route("api/v1.0/moviebooking")]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketsController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        // POST /api/v1.0/moviebooking/{moviename}/add
        [Authorize(Roles = "User")]
        [HttpPost("{moviename}/add")]
        public IActionResult BookTicket(string moviename, [FromBody] TicketCreateDto dto)
        {
            var ticket = _ticketService.BookTicket(dto);
            if (ticket == null) return BadRequest("Not enough tickets available");
            return Ok(ticket);
        }
    }
}

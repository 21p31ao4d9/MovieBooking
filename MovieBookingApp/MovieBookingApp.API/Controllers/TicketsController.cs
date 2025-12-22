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
        public IActionResult BookTicket(string moviename, TicketCreateDto dto)
        {
            var ticket = _ticketService.BookTicket(dto);
            if (ticket == null) return BadRequest("Not enough tickets available");
            return Ok(ticket);
        }

        // PUT /api/v1.0/moviebooking/{moviename}/update/{ticket}
        [Authorize(Roles = "Admin")]
        [HttpPut("{moviename}/update/{userId}")]
        public IActionResult UpdateTicketStatus(string moviename, int ticket, [FromBody] string status)
        {
            var existingTicket = _ticketService.GetTicketsByUser(ticket).FirstOrDefault();
            if (existingTicket == null) return NotFound();

            existingTicket.Status = status;
            return Ok(existingTicket);
        }
    }
}

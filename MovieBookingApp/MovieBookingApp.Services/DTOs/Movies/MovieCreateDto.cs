namespace MovieBookingApp.Services.DTOs.Movies
{
    public class MovieCreateDto
    {
        public string MovieName { get; set; }
        public string TheatreName { get; set; }
        public int TotalTickets { get; set; }
        public int AvailableTickets { get; set; }
    }
}

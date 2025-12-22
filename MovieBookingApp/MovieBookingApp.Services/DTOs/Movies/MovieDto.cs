namespace MovieBookingApp.Services.DTOs.Movies
{
    public class MovieDto
    {
        public int MovieID { get; set; }
        public string MovieName { get; set; }
        public string TheatreName { get; set; }
        public int TotalTickets { get; set; }
        public int AvailableTickets { get; set; }
        public string Status { get; set; }
    }
}

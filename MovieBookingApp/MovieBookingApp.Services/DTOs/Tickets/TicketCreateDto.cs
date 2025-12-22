namespace MovieBookingApp.Services.DTOs.Tickets
{
    public class TicketCreateDto
    {
        public int UserID { get; set; }
        public int MovieID { get; set; }
        public int Quantity { get; set; }
        public string SeatNumbers { get; set; }
    }
}

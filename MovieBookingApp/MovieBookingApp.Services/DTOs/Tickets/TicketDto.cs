namespace MovieBookingApp.Services.DTOs.Tickets
{
    public class TicketDto
    {
        public int TicketID { get; set; }
        public int UserID { get; set; }
        public int MovieID { get; set; }
        public int Quantity { get; set; }
        public string SeatNumbers { get; set; }
        public string Status { get; set; }
        public string MovieName { get; set; }
        public string LoginID { get; set; }
    }
}

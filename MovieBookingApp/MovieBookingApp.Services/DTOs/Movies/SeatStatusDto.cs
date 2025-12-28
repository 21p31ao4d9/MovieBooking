using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieBookingApp.Services.DTOs.Movies
{
    public class SeatStatusDto
    { 
        public string SeatNumber { get; set; }
        public bool IsBooked { get; set; }
    }
}

using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTOs
{
    public class ReservationDto
    {
        public int ReservationId { get; set; }
        public string AppUserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string SpotId { get; set; }
        public decimal Cost { get; set; }
        public int TripId { get; set; }
        public int ReservationStatusId { get; set; }
        public List<string> StintIds { get; set; }
    }
}

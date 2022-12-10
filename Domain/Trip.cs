using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Trip
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public bool IsCancelled { get; set; }
        public decimal Cost { get; set; }
        public ICollection<TripAttendee> Attendees { get; set; } = new List<TripAttendee>();

    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class TripAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int TripId { get; set; }
        public Trip Trip { get; set; }
        public bool IsHost { get; set; }
        public AttendeeStatus AttendeeStatus { get; set; }
    }
}

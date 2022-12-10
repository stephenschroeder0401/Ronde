using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }
        public AppUser AppUser { get; set; }
        public Spot Spot { get; set; }
        public Decimal Cost { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class ReservationStint
    {
        [Key]
        public int ReservationStintId { get; set; }
        public int ReservationId { get; set; }
        public Reservation Reservation { get; set; }
        public int StintId { get; set; }
        public Stint Stint { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class ReservationStatus
    {
        [Key]
        public int ReservationStatusId { get; set; }
        public string Status { get; set; }
    }
}

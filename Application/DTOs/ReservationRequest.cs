using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ReservationRequest
    {
        public int SpotId { get; set; }
        public decimal Cost { get; set; }
        public int ReservationStatusId { get; set; }
        public List<int> StintIds { get; set; }

    }
}

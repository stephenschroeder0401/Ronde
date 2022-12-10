using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MockDtos
    {

        public class SpotMock {
          
            public int SpotId { get; set; }
            public string Description { get; set; }
            public bool IsPrivate { get; set; }
            public int MaxGuests { get; set; } = 1;
            public int RoomId { get; set; }
            public int TripId { get; set; }

        }


        public class StintMock
        {
            public int StintId { get; set; }
            public int TripId { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }

        }

        public class PriceMock
        {
            public int PriceId { get; set; }
            public int StintId { get; set; }
            public int SpotId { get; set; }
            public decimal Price { get; set; }
        }
    }
}

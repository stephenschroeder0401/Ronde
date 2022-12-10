using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTOs
{
    public class PriceDto
    {
        public int PriceId { get; set; }
        public int StintId { get; set; }
        public int SpotId { get; set; }
        public decimal Price { get; set; }
    }
}

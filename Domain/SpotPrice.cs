using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class SpotPrice
    {
        [Key]
        public int PriceId { get; set; }
        public Stint Stint  { get; set; }
        public Spot Spot { get; set; }
        public decimal Amount { get; set; }
    }
}

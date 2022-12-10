using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Stint
    {
        [Key]
        public int StintId { get; set; }
        public Trip Trip { get; set; }
        public  DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}

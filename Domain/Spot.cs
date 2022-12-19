using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Spot
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Trip Trip { get; set; }
        public Room Room { get; set; }
        public bool IsPrivate { get; set; }
        public int MaxGuests { get; set; } = 1;

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class Room
    {
        [Key]
        public int RoomId { get; set; }
        public string Description { get; set; }
        public Trip Trip { get; set; }


    }
}

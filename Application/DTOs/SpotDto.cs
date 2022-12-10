using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DTOs
{
    public class SpotDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
        public int MaxGuests { get; set; } = 1;
        public int RoomId { get; set; }
    }
}

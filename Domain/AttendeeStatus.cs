using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class AttendeeStatus
    {
        [Key]
        public int AttendeeStatusId { get; set; }
        public string Status { get; set; }
    }
}

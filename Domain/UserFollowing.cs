using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain
{
    public class UserFollowing
    {
        [Key]
        public int UserFollowingId { get; set; }
        public string ObserverId { get; set; }
        public AppUser Observer { get; set; }
        public string TargetId { get; set; }
        public AppUser Target { get; set; }
    }
}

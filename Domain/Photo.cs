
using System.ComponentModel.DataAnnotations;


namespace Domain
{
    public class Photo
    {
        [Key]
        public int PhotoId { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}

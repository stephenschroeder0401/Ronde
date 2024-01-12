using System.ComponentModel.DataAnnotations;


namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("^.{4,20}$", ErrorMessage = "Password must be between 4 and 20 characters")]
        public string Password { get; set; }

        public string Username { get; set; }

        public string PhoneNumber { get; set; }

    }
}

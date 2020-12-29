using System.ComponentModel.DataAnnotations;

namespace FairTradeApi.Dtos.User
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        public string OtherContact { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        [Required]
        [StringLength(12, MinimumLength = 4)]
        public string Password { get; set; }
    }
}

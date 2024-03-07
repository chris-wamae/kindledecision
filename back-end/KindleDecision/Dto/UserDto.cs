using System.ComponentModel.DataAnnotations;

namespace KindleDecision.Dto
{
    public class UserDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        public string Language { get; set; }

        [Required]
        [StringLength(
            15,
            ErrorMessage = "Your Password is limited to {2} to {1} characters",
            MinimumLength = 8
        )]
        public string Password { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace KindleDecision.Dto
{
    public class LoginUserDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]

        public string Email { get; set; }

        [Required]
        [StringLength(15, ErrorMessage  = "Your password is limited  to {2} to {1} characters", MinimumLength = 8)]
        public string Password { get; set; }

    }


    public class UserDto : LoginUserDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }

        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        public string Language { get; set; }

        public string Viewmode { get; set; }

        public string UserVisibility { get; set; }

        public ICollection<string> Roles {get;set;}

    }
}

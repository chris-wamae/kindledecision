using System.ComponentModel.DataAnnotations;

namespace KindleDecision.Dto
{
    public class LoginUserDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]

        public string Email { get; set; }

        [Required]
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

        public bool Viewmode { get; set; }

        public bool UserVisibility { get; set; }

        public ICollection<string> Roles {get;set;}

    }
}

<<<<<<< HEAD
﻿namespace KindleDecision.Dto
{
    public class UserDto
    {
     
     public string Username { get; set; }

     public string Email { get; set; }

     public string Phone { get; set; }

     public string Language { get; set; }


=======
﻿using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.ComponentModel.DataAnnotations;

namespace KindleDecision.Dto
{
    public class LoginUserDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]

        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\w\d\s]).{8,}$", ErrorMessage ="Password does not meet requirements")]
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

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    }
}

namespace KindleDecision.Models
{
    public class User
    {
        public int Id { get; set; }
<<<<<<< HEAD

        public string Username { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Language { get; set; }

        public string Password { get; set; }   
        
       
=======
        public string Email { get; set; }
        public string Language { get; set; }        
        public bool Viewmode { get; set; }

        public bool UserVisibility { get; set; }

        public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        public ICollection<UserQuery> UserQuerys { get; set; }
    }
}

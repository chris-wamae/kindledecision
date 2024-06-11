namespace KindleDecision.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Language { get; set; }        
        public bool Viewmode { get; set; }

        public bool UserVisibility { get; set; }

        public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        public ICollection<UserQuery> UserQuerys { get; set; }
    }
}

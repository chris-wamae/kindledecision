namespace KindleDecision.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Language { get; set; }

        public string Password { get; set; } 
        
        public bool Viewmode { get; set; }

        public bool UserVisibility { get; set; }

        public ICollection<UserQuery> UserQuerys { get; set; }
    }
}

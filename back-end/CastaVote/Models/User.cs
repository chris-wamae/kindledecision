namespace CastaVote.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Language { get; set; }

        public string Password { get; set; }    

        public ICollection<UserElection> UserElections { get; set; }
    }
}

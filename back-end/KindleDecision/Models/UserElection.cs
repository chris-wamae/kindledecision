namespace KindleDecision.Models
{
    public class UserElection
    {
        public int UserId { get; set; }
        public int ElectionId { get; set; }

        public User User { get; set; }

        public Election Election { get; set; }
    }
}

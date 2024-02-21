namespace KindleDecision.Models
{
    public class UserVotedInElection
    {
        public int Id { get; set; }
        public int ElectionId { get; set; }
        public int UserId { get; set; }
    }
}

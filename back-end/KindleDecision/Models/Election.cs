namespace KindleDecision.Models
{
    public class Election
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime ExpiryDate { get; set; }

        public int TotalVotes { get; set; }

        public int RemainingVotes { get; set; }

        public int CreatorUserId { get; set; }

        public ICollection<Choice> Choices { get; set; }

        public ICollection<UserElection> UserElections { get; set; }
    }
}

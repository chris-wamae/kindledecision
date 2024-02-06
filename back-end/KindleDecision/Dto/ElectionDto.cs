namespace KindleDecision.Dto
{
    public class ElectionDto
    {

        public string Title { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime ExpiryDate { get; set; }

        public int TotalVotes { get; set; }

        public int RemainingVotes { get; set; }

        public int CreatorUserId { get; set; }
    }
}

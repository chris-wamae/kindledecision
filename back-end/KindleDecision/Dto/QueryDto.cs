namespace KindleDecision.Dto
{
    public class QueryDto
    {
        public int Id { get; set; } 
        public string Title { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime ExpiryDate { get; set; }

        public int TotalSelections { get; set; }

        public int RemainingSelections { get; set; }

        public int CreatorUserId { get; set; }
    }
}

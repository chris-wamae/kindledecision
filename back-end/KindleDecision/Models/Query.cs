namespace KindleDecision.Models
{
    public class Query
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        

        public int TotalSelections { get; set; }

        public int RemainingSelections { get; set; }

        public int CreatorUserId { get; set; }

        public ICollection<Choice> Choices { get; set; }

        public ICollection<UserQuery> UserQuerys { get; set; }
    }
}

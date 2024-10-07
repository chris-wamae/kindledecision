namespace KindleDecision.Models
{
    public class Query
    {
        public int Id { get; set; }

        public string Title { get; set; }

<<<<<<< HEAD
        public DateTime CreationTime { get; set; }

        public DateTime ExpiryDate { get; set; }

=======
        public string Description { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        public int TotalSelections { get; set; }

        public int RemainingSelections { get; set; }

        public int CreatorUserId { get; set; }

        public ICollection<Choice> Choices { get; set; }

        public ICollection<UserQuery> UserQuerys { get; set; }
    }
}

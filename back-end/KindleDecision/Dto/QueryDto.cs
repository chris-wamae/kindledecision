namespace KindleDecision.Dto
{
    public class QueryDto
    {
        public int Id { get; set; } 
        public string Title { get; set; }

<<<<<<< HEAD
        public DateTime CreationTime { get; set; }

=======
        public string Description { get; set; }
        
        public DateTime CreationTime { get; set; }

        public DateTime StartDate { get; set; }

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        public DateTime ExpiryDate { get; set; }

        public int TotalSelections { get; set; }

        public int RemainingSelections { get; set; }

        public int CreatorUserId { get; set; }
    }
}

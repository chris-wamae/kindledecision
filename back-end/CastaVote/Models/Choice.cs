namespace CastaVote.Models
{
    public class Choice
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public  Election Election { get; set; }

        public ICollection<Vote> Votes { get; set; }
    }
}

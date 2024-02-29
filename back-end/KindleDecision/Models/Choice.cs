namespace KindleDecision.Models
{
    public class Choice
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public  Query Query { get; set; }

        public ICollection<Selection> Selections { get; set; }
    }
}

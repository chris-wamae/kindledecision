namespace KindleDecision.Models
{
    public class Choice
    {
        public int Id { get; set; }

        public string Title { get; set; }

<<<<<<< HEAD
=======
        public string Description { get; set; }

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        public  Query Query { get; set; }

        public ICollection<Selection> Selections { get; set; }
    }
}

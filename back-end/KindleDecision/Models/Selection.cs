namespace KindleDecision.Models
{
    public class Selection
    {
     
    public int Id { get; set; }

    public Choice Choice { get; set; }

<<<<<<< HEAD
    public int SelectorUserId { get; set;}

=======
    public string Reason { get; set; }

    public int SelectorUserId { get; set;}

    public UserSelectedInQuery UserSelectedInQuery { get; set;}

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    }
}

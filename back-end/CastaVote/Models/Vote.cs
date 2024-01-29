namespace CastaVote.Models
{
    public class Vote
    {
     
    public int Id { get; set; }

    public Choice Choice { get; set; }

    public int VoterUserId { get; set;}

    }
}

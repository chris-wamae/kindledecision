namespace KindleDecision.Models
{
    public class MakeSelection
    {
        public int UserId { get; set; }

        public int ChoiceId { get; set; }

        public int QueryId { get; set; }

        public string Reason { get; set; }
    }
}

namespace KindleDecision.Models
{
    public class UserQuery
    {
        public int UserId { get; set; }
        public int QueryId { get; set; }

        public User User { get; set; }

        public Query Query { get; set; }
    }
}

using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IVoteRepository
    {
     Vote GetVote(int id);
     Vote GetAllVotes();
     bool VoteExists(int id);
     ICollection<Vote> GetVotesByUser(int userId);

     



    }
}

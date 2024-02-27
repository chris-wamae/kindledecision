using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IVoteRepository
    {
        Vote GetVote(int id);
        ICollection<Vote> GetAllVotes();
        bool VoteExists(int id);
        ICollection<Vote> GetVotesByUser(int userId);
        ICollection<Vote> GetVotesByChoice(int choiceId);
        bool CreateVote(int choiceId,Vote vote);

        bool UpdateVote(int voteId, Vote vote);

        bool DeleteVote(Vote vote);

        bool Save();
    }
}

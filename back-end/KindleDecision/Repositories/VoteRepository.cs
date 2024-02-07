using KindleDecision.Models;
using KindleDecision.Data;
using KindleDecision.Interfaces;

namespace KindleDecision.Repositories
{
    public class VoteRepository : IVoteRepository
    {
        private readonly DataContext _dataContext;
        public VoteRepository(DataContext dataContext, IChoiceRepository choiceRepository)
        {
            _dataContext = dataContext;
        }

        public bool VoteExists(int Id)
        {
            return _dataContext.Votes.Any(v => v.Id == Id);
        }

        public Vote GetVote(int Id)
        {
            return _dataContext.Votes.Where(v => v.Id == Id).FirstOrDefault();
        }

        public ICollection<Vote> GetAllVotes()
        {
            return _dataContext.Votes.OrderBy(v => v.Id).ToList();
        }

        public ICollection<Vote> GetVotesByUser(int userId)
        {
            return _dataContext.Votes.Where(v => v.VoterUserId == userId).ToList();
        }

        public bool Save()
        {
            var saved = _dataContext.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateVote(int choiceId, Vote vote)
        {
            Choice choice = _dataContext.Choices.Where(c => c.Id == choiceId).FirstOrDefault();

            vote.Choice = choice;

            _dataContext.Add(vote);

            return Save();
        }

        public bool UpdateVote(int voteId, Vote vote)
        {
            _dataContext.Update(vote);

            return Save();
        }

        public bool DeleteVote(Vote vote)
        {
            _dataContext.Remove(vote);

            return Save();
        }

    }
}

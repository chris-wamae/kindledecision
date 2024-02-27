using KindleDecision.Models;
using KindleDecision.Interfaces;
using KindleDecision.Data;
using System.Web.Mvc;

namespace KindleDecision.Repositories
{
    public class UserVotedInElectionRepository : IUserVotedInElectionRepository
    {
        private readonly DataContext _dataContext;

        public UserVotedInElectionRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public bool UserVotedInElectionExists(int userVotedInElectionId)
        {
          return _dataContext.UserVotedInElections.Any(uVE => uVE.Id == userVotedInElectionId);
        }

        public UserVotedInElection GetUserVotedInElection(int userVotedInElectionId)
        {
          return _dataContext.UserVotedInElections.Where(uVE => uVE.Id == userVotedInElectionId).FirstOrDefault();
        }

        public ICollection<UserVotedInElection> GetAllUserVotedInElection()
        {
            return _dataContext.UserVotedInElections.OrderBy(uVE => uVE.Id).ToList();
        }

        public ICollection<UserVotedInElection> GetUserVotedInElectionsByUser(int userId) 
        {
          return _dataContext.UserVotedInElections.Where(uVE => uVE.UserId == userId).ToList();
        }

        public ICollection<UserVotedInElection> GetUserVotedInElectionsByElection(int electionId)
        {
            return _dataContext.UserVotedInElections.Where(uVE => uVE.ElectionId == electionId).ToList();
        }







    }
}

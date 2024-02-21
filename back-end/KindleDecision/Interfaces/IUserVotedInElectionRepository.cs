using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IUserVotedInElectionRepository 
    {

        public bool UserVotedInElectionExists(int userVotedInElectionId);

        public ICollection<UserVotedInElection> GetAllUserVotedInElection();

        public UserVotedInElection GetUserVotedInElection(int userVotedInElectionId);

        public bool DeleteUserVotedInElection(UserVotedInElection userVotedInElection);

        public bool CreateUserVotedInElection(UserVotedInElection userVotedInElection);

        public bool Save();

        public ICollection<UserVotedInElection> GetUserVotedInElectionsByUser(int userId);

        public ICollection<UserVotedInElection> GetUserVotedInElectionsByElection(int electionId);

    }
}

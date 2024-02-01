using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();

        User GetUser(int id);

        User GetUser(string username);

        bool UserExists(int id);

        ICollection<User> GetUsersByElection(int electionId);

        User GetElectionCreator(int electionId);

        bool CreateUser(User user);

        bool UpdateUser(int userId,User user);

        bool DeleteUser(User user);

        bool Save();

    }
}

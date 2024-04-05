using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();

        User GetUser(int id);

        User GetUser(string username);

        User GetUserByEmail(string email);

        bool UserExists(int id);

        ICollection<User> GetUsersByQuery(int queryId);

        User GetQueryCreator(int queryId);

        bool CreateUser(User user);

        bool UpdateUser(int userId,User user);

        bool DeleteUser(User user);

        bool Save();

    }
}

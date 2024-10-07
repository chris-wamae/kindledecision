using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IUserRepository
    {
<<<<<<< HEAD
        ICollection<User> GetUsers();

        User GetUser(int id);

        User GetUser(string username);

        bool UserExists(int id);

=======
        ICollection<string> GetUsers();

        User GetUser(int id);

        //User GetUser(string username);

        User GetUserByEmail(string email);

        bool UserExists(int id);

        bool UserExists(UserEmail userEmail);

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        ICollection<User> GetUsersByQuery(int queryId);

        User GetQueryCreator(int queryId);

<<<<<<< HEAD
        bool CreateUser(User user);
=======
        User CreateUser(User user);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        bool UpdateUser(int userId,User user);

        bool DeleteUser(User user);

        bool Save();

    }
}

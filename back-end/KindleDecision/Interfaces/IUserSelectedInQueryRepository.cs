using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IUserSelectedInQueryRepository 
    {

        public bool UserSelectedInQueryExists(int userSelectedInQueryId);

        public ICollection<UserSelectedInQuery> GetAllUserSelectedInQuery();

        public UserSelectedInQuery GetUserSelectedInQuery(int userSelectedInQueryId);

<<<<<<< HEAD
        //public bool DeleteUserSelectedInQuery(UserSelectedInQuery userSelectedInQuery);

        //public bool CreateUserSelectedInQuery(UserSelectedInQuery userSelectedInQuery);

        //public bool Save();
=======
        public bool DeleteUserSelectedInQuery(UserSelectedInQuery userSelectedInQuery);

        public bool CreateUserSelectedInQuery(UserSelectedInQuery userSelectedInQuery);

        public bool Save();
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        public ICollection<UserSelectedInQuery> GetUserSelectedInQuerysByUser(int userId);

        public ICollection<UserSelectedInQuery> GetUserSelectedInQuerysByQuery(int queryId);

<<<<<<< HEAD
=======
        public bool UserHasSelectedInQuery(int queryId, int userId);

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    }
}

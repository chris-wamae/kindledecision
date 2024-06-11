using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IUserSelectedInQueryRepository 
    {

        public bool UserSelectedInQueryExists(int userSelectedInQueryId);

        public ICollection<UserSelectedInQuery> GetAllUserSelectedInQuery();

        public UserSelectedInQuery GetUserSelectedInQuery(int userSelectedInQueryId);

        public bool DeleteUserSelectedInQuery(UserSelectedInQuery userSelectedInQuery);

        public bool CreateUserSelectedInQuery(UserSelectedInQuery userSelectedInQuery);

        public bool Save();

        public ICollection<UserSelectedInQuery> GetUserSelectedInQuerysByUser(int userId);

        public ICollection<UserSelectedInQuery> GetUserSelectedInQuerysByQuery(int queryId);

        public bool UserHasSelectedInQuery(int queryId, int userId);

    }
}

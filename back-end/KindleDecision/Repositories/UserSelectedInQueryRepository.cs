using KindleDecision.Models;
using KindleDecision.Interfaces;
using KindleDecision.Data;
using System.Web.Mvc;

namespace KindleDecision.Repositories
{
    public class UserSelectedInQueryRepository : IUserSelectedInQueryRepository
    {
        private readonly DataContext _dataContext;

        public UserSelectedInQueryRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public bool UserSelectedInQueryExists(int userSelectedInQueryId)
        {
          return _dataContext.UserSelectedInQuerys.Any(uVQ => uVQ.Id == userSelectedInQueryId);
        }

        public UserSelectedInQuery GetUserSelectedInQuery(int userSelectedInQueryId)
        {
          return _dataContext.UserSelectedInQuerys.Where(uVQ => uVQ.Id == userSelectedInQueryId).FirstOrDefault();
        }

        public ICollection<UserSelectedInQuery> GetAllUserSelectedInQuery()
        {
            return _dataContext.UserSelectedInQuerys.OrderBy(uVQ => uVQ.Id).ToList();
        }

        public ICollection<UserSelectedInQuery> GetUserSelectedInQuerysByUser(int userId) 
        {
          return _dataContext.UserSelectedInQuerys.Where(uVE => uVE.UserId == userId).ToList();
        }

        public ICollection<UserSelectedInQuery> GetUserSelectedInQuerysByQuery(int queryId)
        {
            return _dataContext.UserSelectedInQuerys.Where(uVE => uVE.QueryId == queryId).ToList();
        }







    }
}

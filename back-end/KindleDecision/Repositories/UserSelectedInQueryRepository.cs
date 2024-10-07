using KindleDecision.Models;
using KindleDecision.Interfaces;
using KindleDecision.Data;
using System.Web.Mvc;
using Microsoft.EntityFrameworkCore;

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

        public bool Save()
        {
           var saved = _dataContext.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateUserSelectedInQuery(UserSelectedInQuery uSIQ)
        {
         _dataContext.Add(uSIQ);
            return Save();
        }

        public bool DeleteUserSelectedInQuery(UserSelectedInQuery uSIQ)
        {
          _dataContext.Remove(uSIQ);

          return Save();
        }

        public bool UserHasSelectedInQuery(int queryId, int userId)
        {
          
            var foundUSIQ =  _dataContext.UserSelectedInQuerys.Where(uSIQ => (uSIQ.UserId == userId) && (uSIQ.QueryId == queryId)).FirstOrDefault();
            
            if(foundUSIQ != null)
            {
                return true;
            }

            else
            {
                return false;
            }

        }





    }
}

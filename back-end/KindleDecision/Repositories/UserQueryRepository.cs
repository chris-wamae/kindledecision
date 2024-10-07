using KindleDecision.Interfaces;
using KindleDecision.Data;
using KindleDecision.Models;
namespace KindleDecision.Repositories
{
    public class UserQueryRepository : IUserQueryRepository
    {

    DataContext _dataContext;
        public UserQueryRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

     public bool Save()
     {
         var saved = _dataContext.SaveChanges();
         
           return saved > 0 ? true : false;
     }

     public bool DeleteUserQuery(int queryId,int  userId) 
     {
        
     UserQuery uq = _dataContext.UserQuerys.Where(uq => uq.QueryId == queryId && uq.UserId == userId).FirstOrDefault();

     _dataContext.UserQuerys.Remove(uq);

            return Save();
          
     } 


     public bool DeleteUserQueriesByUser(int userId)
     {
            IEnumerable<UserQuery> userQueries = _dataContext.UserQuerys.Where(uq => uq.UserId == userId).ToList();

            _dataContext.RemoveRange(userQueries);

            return Save();
     }
     

    }
}

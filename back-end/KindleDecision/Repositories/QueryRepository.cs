using KindleDecision.Data;
using KindleDecision.Interfaces;
using KindleDecision.Models;
using Microsoft.EntityFrameworkCore;

namespace KindleDecision.Repositories
{
    public class QueryRepository : IQueryRepository
    {
        private readonly DataContext _dataContext;

        public QueryRepository(DataContext dataContext) 
        {

         _dataContext = dataContext;
        }

        public bool QueryExists(int queryId) 
        {
        return _dataContext.Querys.Any(q => q.Id == queryId);
        }

        public Query GetQuery(int queryId) 
        {
            return _dataContext.Querys.Where(q => q.Id == queryId).FirstOrDefault();
        }

        public Query GetQuery(string title)
        {
            return _dataContext.Querys.Where(q => q.Title == title).FirstOrDefault();
        }

        public ICollection<Query> GetAllQuerys() 
        {
           return  _dataContext.Querys.OrderBy(q => q.Id).ToList();
        }

        public ICollection<Query> GetQuerysByUser(int userId)
        {
            return _dataContext.UserQuerys.Where(u => u.UserId == userId).Select(u => u.Query).ToList(); 
        }

        public ICollection<Query> GetQuerysByCreator(int userId)
        {
            return _dataContext.Querys.Where(q => q.CreatorUserId == userId).ToList();
        }

        public bool Save()
        {
            var saved = _dataContext.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateQuery(Query query)
        {
            _dataContext.Add(query);
            return Save();
        }

        public bool AddParticipant(User user, Query query)
        {
            var userQuery = new UserQuery()
            {
                User = user,
                Query = query
            };
            _dataContext.Add(userQuery);
            return Save();
        }

        public bool UpdateQuery(Query query)
        {
            _dataContext.Update(query);
            return Save();
        }

        public bool DeleteQuery(int queryId) 
        {
            var queryToDelete = _dataContext.Querys.Where(q => q.Id == queryId).Include(q => q.Choices).FirstOrDefault();

            _dataContext.Remove(queryToDelete);

            return Save();
        }


        public bool DeleteUsersCreatedQueries(int internalUserId)
        {
            var queriesToDelete = _dataContext.Querys.Where(q => q.CreatorUserId == internalUserId).ToList();

            _dataContext.RemoveRange(queriesToDelete);

            return Save();
        }



    }
}

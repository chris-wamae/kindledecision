using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IQueryRepository
    {
    Query GetQuery(int id);

    Query GetQuery(string id);

    bool QueryExists(int id);

    ICollection<Query> GetAllQuerys();

    ICollection<Query> GetQuerysByUser(int userId);

    ICollection<Query> GetQuerysByCreator(int userId);

    bool CreateQuery(Query query);

    bool UpdateQuery(Query query);

    bool AddParticipant( User user, Query query);

    bool DeleteQuery(Query query);

    bool Save();
    }
}

namespace KindleDecision.Interfaces
{
    public interface IUserQueryRepository
    {

        bool Save();
        
        bool DeleteUserQuery(int queryId, int userId);

        bool DeleteUserQueriesByUser(int userId);   

    }
}

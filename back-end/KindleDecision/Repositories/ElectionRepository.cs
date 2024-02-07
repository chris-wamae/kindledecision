using KindleDecision.Data;
using KindleDecision.Interfaces;
using KindleDecision.Models;

namespace KindleDecision.Repositories
{
    public class ElectionRepository : IElectionRepository
    {
        private readonly DataContext _dataContext;

        public ElectionRepository(DataContext dataContext) 
        {

         _dataContext = dataContext;
        }

        public bool ElectionExists(int electionId) 
        {
        return _dataContext.Elections.Any(e => e.Id == electionId);
        }

        public Election GetElection(int electionId) 
        {
            return _dataContext.Elections.Where(e => e.Id == electionId).FirstOrDefault();
        }

        public Election GetElection(string title)
        {
            return _dataContext.Elections.Where(e => e.Title == title).FirstOrDefault();
        }

        public ICollection<Election> GetAllElections() 
        {
           return  _dataContext.Elections.OrderBy(e => e.Id).ToList();
        }

        public ICollection<Election> GetElectionsByUser(int userId)
        {
            return _dataContext.UserElections.Where(u => u.UserId == userId).Select(u => u.Election).ToList(); 
        }

        public ICollection<Election> GetElectionsByCreator(int userId)
        {
            return _dataContext.Elections.Where(e => e.CreatorUserId == userId).ToList();
        }

        public bool Save()
        {
            var saved = _dataContext.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateElection(Election election)
        {
            _dataContext.Add(election);
            return Save();
        }

        public bool UpdateElection(int electionId,Election election)
        {
            _dataContext.Update(election);
            return Save();
        }

        public bool DeleteElection(Election election) 
        {
            _dataContext.Remove(election);
            return Save();
        }



    }
}

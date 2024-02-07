using KindleDecision.Data;
using KindleDecision.Interfaces;
using KindleDecision.Models;
using Microsoft.AspNetCore.Mvc;
using System.Web.Mvc;


namespace KindleDecision.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
   


        public UserRepository(DataContext context, IElectionRepository electionRepository)
        {
                _context = context;
        }


        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }

        public User GetUser(int id) 
        { 
            return _context.Users.Where(u => u.Id == id).FirstOrDefault();    
        }

        public User GetUser(string username) 
        {
            return _context.Users.Where(u => u.Username == username).FirstOrDefault();
        }

        public ICollection<User> GetUsers() 
        {
            
        return _context.Users.OrderBy(u => u.Id).ToList();
        
        }

        public ICollection<User> GetUsersByElection(int electionId)
        {
            return _context.UserElections.Where(e => e.UserId == electionId).Select(e => e.User).ToList();
        }

        public User GetElectionCreator(int electionId) 
        {
            Election election = _context.Elections.Where(e => e.Id == electionId).FirstOrDefault();

            int userId = election.CreatorUserId;

            return _context.Users.Where(u => u.Id == userId).FirstOrDefault();
        }

        public bool  Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateUser(User user)
        {
            _context.Add(user);
            return Save();
        }

        public bool UpdateUser(int userId, User user) 
        {
            _context.Update(user);
            return Save();
        }

        public bool DeleteUser(User userToDelete)  
        {
            _context.Remove(userToDelete);
            return Save();
        }
        
    }
}

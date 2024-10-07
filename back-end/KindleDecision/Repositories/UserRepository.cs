using KindleDecision.Data;
using KindleDecision.Interfaces;
using KindleDecision.Models;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using System.Web.Mvc;


=======
using Microsoft.EntityFrameworkCore;
using System.Web.Mvc;

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
namespace KindleDecision.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
<<<<<<< HEAD
   


        public UserRepository(DataContext context)
        {
                _context = context;
        }


=======

        public UserRepository(DataContext context)
        {
            _context = context;
        }

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }

<<<<<<< HEAD
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
        
=======
        public bool UserExists(UserEmail userEmail)
        {
            return _context.Users.Any(u => u.Email == userEmail.Email);
        }

        public User GetUser(int id)
        {
            return _context.Users.Where(u => u.Id == id).FirstOrDefault();
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.Where(u => u.Email == email).FirstOrDefault();
        }

        public ICollection<string> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).Select(u => u.Email).ToList();
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        }

        public ICollection<User> GetUsersByQuery(int queryId)
        {
<<<<<<< HEAD
            return _context.UserQuerys.Where(u => u.UserId == queryId).Select(q => q.User).ToList();
        }

        public User GetQueryCreator(int queryId) 
=======
            return _context.UserQuerys
                .Where(uQ => uQ.QueryId == queryId)
                .Select(uQ => uQ.User)
                .ToList();
        }

        public User GetQueryCreator(int queryId)
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        {
            Query query = _context.Querys.Where(q => q.Id == queryId).FirstOrDefault();

            int userId = query.CreatorUserId;

            return _context.Users.Where(u => u.Id == userId).FirstOrDefault();
        }

<<<<<<< HEAD
        public bool  Save()
=======
        public bool Save()
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

<<<<<<< HEAD
        public bool CreateUser(User user)
        {
            _context.Add(user);
            return Save();
        }

        public bool UpdateUser(int userId, User user) 
=======
        public User CreateUser(User user)
        {
            _context.Add(user);
            if (!Save())
            {
                return null;
            }
            return user;
        }

        public bool UpdateUser(int userId, User user)
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        {
            _context.Update(user);
            return Save();
        }

<<<<<<< HEAD
        public bool DeleteUser(User userToDelete)  
        {
            _context.Remove(userToDelete);
            return Save();
        }
        
=======
        public bool DeleteUser(User userToDelete)
        {   
            var userToDeleteObj = _context.Users.Where(u => u.Id == userToDelete.Id).Include(u => u.UserQuerys).FirstOrDefault();

            _context.Remove(userToDeleteObj);

            return Save();
        }
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    }
}

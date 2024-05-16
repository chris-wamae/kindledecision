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

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }

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

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(u => u.Id).ToList();
        }

        public ICollection<User> GetUsersByQuery(int queryId)
        {
            return _context.UserQuerys
                .Where(uQ => uQ.QueryId == queryId)
                .Select(uQ => uQ.User)
                .ToList();
        }

        public User GetQueryCreator(int queryId)
        {
            Query query = _context.Querys.Where(q => q.Id == queryId).FirstOrDefault();

            int userId = query.CreatorUserId;

            return _context.Users.Where(u => u.Id == userId).FirstOrDefault();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

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

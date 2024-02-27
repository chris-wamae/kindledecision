using KindleDecision.Interfaces;
using KindleDecision.Data;
using KindleDecision.Models;
using System.Web.Mvc;

namespace KindleDecision.Repositories
{
    public class ChoiceRepository : IChoiceRepository
    {
        private readonly DataContext _dataContext;
        private readonly IVoteRepository _voteRepository;

        public ChoiceRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public bool ChoiceExists(int choiceId)
        {
            return _dataContext.Choices.Any(c => c.Id == choiceId);
        }

        public Choice GetChoice(int choiceId)
        {
            return _dataContext.Choices.Where(c => c.Id == choiceId).FirstOrDefault();
        }

        public Choice GetChoice(string title)
        {
            return _dataContext.Choices.Where(c => c.Title == title).FirstOrDefault();
        }

        public ICollection<Choice> GetAllChoices()
        {
            return _dataContext.Choices.OrderBy(c => c.Id).ToList();
        }

        public ICollection<Choice> GetChoicesByElection(int electionId)
        {
           return _dataContext.Choices.Where(c => c.Election.Id == electionId).ToList();
        }

        public ICollection<Choice> GetChoicesByUserVote(int userId)
        {
              List<Vote> votes = _dataContext.Votes.Where(v => v.VoterUserId == userId).ToList();
              
              List<Choice> choices = new List<Choice>();

              foreach (Vote vote in votes)
                {
                choices.Add(_dataContext.Votes.Where(v => v.Id == vote.Id).Select(v => v.Choice).FirstOrDefault());
                }

              return choices;
        }

        public bool Save()
        {
            var saved = _dataContext.SaveChanges();

            return saved > 0 ? true : false;
        }

        public bool CreateChoice(int electionId, Choice choice)
        {
            Election election = _dataContext.Elections
                .Where(e => e.Id == electionId)
                .FirstOrDefault();

            choice.Election = election;

            _dataContext.Add(choice);

            return Save();
        }

        public bool UpdateChoice(int choiceId, Choice choice)
        {
            _dataContext.Update(choice);
            return Save();
        }

        public bool DeleteChoice(Choice choice)
        {
            _dataContext.Remove(choice);
            return Save();
        }
    }
}

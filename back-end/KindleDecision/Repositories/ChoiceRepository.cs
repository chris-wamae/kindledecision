using KindleDecision.Interfaces;
using KindleDecision.Data;
using KindleDecision.Models;
using System.Web.Mvc;

namespace KindleDecision.Repositories
{
    public class ChoiceRepository : IChoiceRepository
    {
        private readonly DataContext _dataContext;
        private readonly ISelectionRepository _voteRepository;

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

        public ICollection<Choice> GetChoicesByQuery(int queryId)
        {
           return _dataContext.Choices.Where(c => c.Query.Id == queryId).ToList();
        }

        public ICollection<Choice> GetChoicesByUserSelection(int userId)
        {
              List<Selection> selections = _dataContext.Selections.Where(s => s.SelectorUserId == userId).ToList();
              
              List<Choice> choices = new List<Choice>();

              foreach (Selection selection in selections)
                {
                choices.Add(_dataContext.Selections.Where(s => s.Id == selection.Id).Select(v => v.Choice).FirstOrDefault());
                }

              return choices;
        }

        public bool Save()
        {
            var saved = _dataContext.SaveChanges();

            return saved > 0 ? true : false;
        }

        public bool CreateChoice(int queryId, Choice choice)
        {
            Query query = _dataContext.Querys
                .Where(e => e.Id == queryId)
                .FirstOrDefault();

            choice.Query = query;

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

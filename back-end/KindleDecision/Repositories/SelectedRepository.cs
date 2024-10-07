using KindleDecision.Models;
using KindleDecision.Data;
using KindleDecision.Interfaces;
using AutoMapper;

namespace KindleDecision.Repositories
{
    public class SelectionRepository : ISelectionRepository
    {
        private readonly DataContext _dataContext;
        public SelectionRepository(DataContext dataContext, IChoiceRepository choiceRepository)
        {
            _dataContext = dataContext;
        }

        public bool SelectionExists(int Id)
        {
            return _dataContext.Selections.Any(s => s.Id == Id);
        }

        public Selection GetSelection(int Id)
        {
            return _dataContext.Selections.Where(s => s.Id == Id).FirstOrDefault();
        }

        public ICollection<Selection> GetAllSelections()
        {
            return _dataContext.Selections.OrderBy(s => s.Id).ToList();
        }

        public ICollection<Selection> GetSelectionsByUser(int userId)
        {
            return _dataContext.Selections.Where(s => s.SelectorUserId == userId).ToList();
        }

        public ICollection<Selection>  GetSelectionsByChoice(int choiceId)
        {
            return _dataContext.Selections.Where(s => s.Choice.Id == choiceId).ToList();
        }

        public bool Save()
        {
            var saved = _dataContext.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateSelection(int choiceId, Selection selection)
        {
            Choice choice = _dataContext.Choices.Where(c => c.Id == choiceId).FirstOrDefault();

            selection.Choice = choice;

            _dataContext.Add(selection);

            return Save();
        }

        public bool UpdateSelection(int selectionId, Selection selection)
        {
            _dataContext.Update(selection);

            return Save();
        }

        public bool DeleteSelection(Selection selection)
        {
            _dataContext.Remove(selection);

            return Save();
        }

    }
}

using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface ISelectionRepository
    {
        Selection GetSelection(int id);
        ICollection<Selection> GetAllSelections();
        bool SelectionExists(int id);
        ICollection<Selection> GetSelectionsByUser(int userId);
        ICollection<Selection> GetSelectionsByChoice(int choiceId);
        bool CreateSelection(int choiceId,Selection selection);

        bool UpdateSelection(int selectionId, Selection seleciton);

        bool DeleteSelection(Selection selection);

        bool Save();
    }
}

using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IChoiceRepository
    {
        Choice GetChoice(int id);

        Choice GetChoice(string title);

        bool ChoiceExists(int choiceId);

        ICollection<Choice> GetAllChoices();

<<<<<<< HEAD
        ICollection<Choice> GetChoicesByQuery(int queryId);
=======
        ICollection<ChoiceWithSelectionCount> GetChoicesByQuery(int queryId);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        ICollection<Choice> GetChoicesByUserSelection(int userId);

        //Choice GetChoiceByVote(int voteId);
        bool Save();

        bool CreateChoice(int queryId,Choice choice);

        //this method should only be available before the first vote is cast
        //ie. RemainingVotes == TotalVotes
        bool UpdateChoice(int choiceId,Choice choice);

<<<<<<< HEAD
        bool DeleteChoice(Choice choice);
=======
        bool DeleteChoice(int choiceId);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

    }
}

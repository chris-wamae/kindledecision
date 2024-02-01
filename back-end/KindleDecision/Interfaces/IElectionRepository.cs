using KindleDecision.Models;

namespace KindleDecision.Interfaces
{
    public interface IElectionRepository
    {
    Election GetElection(int id);

    Election GetElection(string id);

    bool ElectionExists(int id);

    ICollection<Election> GetAllElections();

    ICollection<Election> GetElectionsByUser(int userId);

    ICollection<Election> GetElectionsByCreator(int userId);

    bool CreateElection(Election election);

    bool UpdateElection(int electionId, Election election);

    bool DeleteElection(Election election);

    bool Save();

    }
}

using CastaVote.Data;
using CastaVote.Models;

namespace CastaVote
{
    public class Seed
    {
    private readonly DataContext dataContext;

    public Seed(DataContext context)
    {
        this.dataContext = context;

    }
    public void SeedDataContext() 
    {
    
            if(!dataContext.UserElections.Any())
            {
                var UserElections = new List<UserElection>();

                {
                    new UserElection()

                    {

                        Election = new Election()

                        {
                            Title = "Where to go for Christmas?",
                            CreationTime = new DateTime(2023, 12, 3, 15, 48, 44),
                            ExpiryDate = new DateTime(2023,12,15,0,0,0),
                            TotalVotes = 3,
                            RemainingVotes = 3,
                            

                     }

                    }
                }

            }

            
    }

    }
}

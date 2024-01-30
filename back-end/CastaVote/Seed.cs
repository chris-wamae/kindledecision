using KindleDecison.Data;
using KindleDecison.Models;

namespace KindleDecison
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
            if (!dataContext.UserElections.Any())
            {
                var UserElections = new List<UserElection>()
                {
                    new UserElection()
                    {
                        Election = new Election()
                        {
                            Title = "Where to go for Christmas?",
                            CreationTime = new DateTime(2023, 12, 3, 15, 48, 44),
                            ExpiryDate = new DateTime(2023, 12, 15, 0, 0, 0),
                            TotalVotes = 3,
                            RemainingVotes = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "Maldives",
                                    Votes = new List<Vote>() { }
                                },
                                new Choice
                                {
                                    Title = "Pueto Vallarta",
                                    Votes = new List<Vote>() { }
                                }
                            }
                        },
                        User = new User()
                        {
                            Username = "Wamae",
                            Email = "wamae@gmail.com",
                            Phone = "0122344449",
                            Language = "en",
                            Password = "wamae",
                        }
                    },
                    new UserElection()
                    {
                        Election = new Election()
                        {
                            Title = "Which is the greatest movie of all time?",
                            CreationTime = new DateTime(2023, 12, 3, 17, 48, 44),
                            ExpiryDate = new DateTime(2023, 12, 15, 1, 0, 0),
                            TotalVotes = 3,
                            RemainingVotes = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "Spirited Away?",
                                    Votes = new List<Vote>() { }
                                },
                                new Choice
                                {
                                    Title = "Avengers: Endgame",
                                    Votes = new List<Vote>() { }
                                },
                                new Choice()
                                {
                                    Title = "X-Men: Days of future past",
                                    Votes = new List<Vote>() { }
                                }
                            }
                        },
                        User = new User()
                        {
                            Username = "Chris",
                            Email = "chris@gmail.com",
                            Phone = "0122837449",
                            Language = "en",
                            Password = "chris",
                        }
                    },
                    new UserElection()
                    {
                        Election = new Election()
                        {
                            Title = "What's the age of the oldest human alive?",
                            CreationTime = new DateTime(2023, 12, 3, 17, 51, 44),
                            ExpiryDate = new DateTime(2023, 12, 15, 1, 36, 0),
                            TotalVotes = 3,
                            RemainingVotes = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "108",
                                    Votes = new List<Vote>() { }
                                },
                                new Choice
                                {
                                    Title = "112",
                                    Votes = new List<Vote>() { }
                                },
                                new Choice()
                                {
                                    Title = "113",
                                    Votes = new List<Vote>() { }
                                }
                            }
                        },
                        User = new User()
                        {
                            Username = "Troller",
                            Email = "troller@gmail.com",
                            Phone = "0384848429",
                            Language = "en",
                            Password = "troller",
                        }
                    }
                };
                dataContext.UserElections.AddRange(UserElections);
                dataContext.SaveChanges();
            }
        }
    }
}

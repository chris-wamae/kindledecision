using KindleDecision.Data;
using KindleDecision.Models;

namespace KindleDecision
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
            if (!dataContext.UserQuerys.Any())
            {
                List<UserQuery> UserQuerys = new List<UserQuery>()
                {
                    new UserQuery()
                    {
                        Query = new Query()
                        {
                            Title = "Where to go for Christmas?",
                            CreationTime = new DateTime(2023, 12, 3, 15, 48, 44),
                            StartDate = new DateTime(2024,1,15,0,0,0),
                            ExpiryDate = new DateTime(2023, 12, 15, 0, 0, 0),
                            TotalSelections = 3,
                            RemainingSelections = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "Maldives"
                                },
                                new Choice
                                {
                                    Title = "Pueto Vallarta",
                                    Selections = new List<Selection>(){}
                                }
                            },
                            CreatorUserId = 1
                        },
                        User = new User()
                        {
                            
                            Email = "wamae@gmail.com",
                            Language = "en",
                            Password = "wamae",
                        }
                    },
                    new UserQuery()
                    {
                        Query = new Query()
                        {
                            Title = "Which is the greatest movie of all time?",
                            CreationTime = new DateTime(2023, 12, 3, 17, 48, 44),
                            StartDate = new DateTime(2024,1,15,0,0,0),
                            ExpiryDate = new DateTime(2023, 12, 15, 1, 0, 0),
                            TotalSelections = 3,
                            RemainingSelections = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "Spirited Away?"
                                },
                                new Choice
                                {
                                    Title = "Avengers: Endgame"
                                },
                                new Choice()
                                {
                                    Title = "X-Men: Days of future past"
                                }
                            },
                            CreatorUserId   =  2,
                        },
                        User = new User()
                        {
                            Email = "chris@gmail.com",
                            Language = "en",
                            Password = "chris",
                        }
                    },
                    new UserQuery()
                    {
                        Query = new Query()
                        {
                            Title = "What's the age of the oldest human alive?",
                            CreationTime = new DateTime(2023, 12, 3, 17, 51, 44),
                            StartDate = new DateTime(2024,1,15,0,0,0),
                            ExpiryDate = new DateTime(2023, 12, 15, 1, 36, 0),
                            TotalSelections = 3,
                            RemainingSelections = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "108"
                                },
                                new Choice
                                {
                                    Title = "112"
                                },
                                new Choice()
                                {
                                    Title = "113"
                                }
                            },
                            CreatorUserId = 3
                        },
                        User = new User()
                        {
                            Email = "troller@gmail.com",
                            Language = "en",
                            Password = "troller",
                        }
                    }
                };
                dataContext.UserQuerys.AddRange(UserQuerys);
                dataContext.SaveChanges();
            }
        }
    }
}

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
                            ExpiryDate = new DateTime(2023, 12, 15, 0, 0, 0),
                            TotalSelections = 3,
                            RemainingSelections = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "Maldives",
                                    Selections = new List<Selection>()
                                    {
                                    new Selection
                                    {
                                    SelectorUserId = 2
                                    },
                                    new Selection
                                    {
                                    SelectorUserId = 1
                                    }
                                    }
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
                            Username = "Wamae",
                            Email = "wamae@gmail.com",
                            Phone = "0122344449",
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
                            ExpiryDate = new DateTime(2023, 12, 15, 1, 0, 0),
                            TotalSelections = 3,
                            RemainingSelections = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "Spirited Away?",
                                    Selections = new List<Selection>()
                                    {
                                    new Selection
                                    {
                                        SelectorUserId = 1
                                    }

                                    }
                                },
                                new Choice
                                {
                                    Title = "Avengers: Endgame",
                                    Selections = new List<Selection>()
                                    {
                                    new Selection
                                    {
                                    SelectorUserId = 2
                                    }
                                    }
                                },
                                new Choice()
                                {
                                    Title = "X-Men: Days of future past",
                                    Selections = new List<Selection>()
                                    {
                                    new Selection
                                    {
                                    SelectorUserId = 3
                                    }
                                    }
                                }
                            },
                            CreatorUserId   =  2,
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
                    new UserQuery()
                    {
                        Query = new Query()
                        {
                            Title = "What's the age of the oldest human alive?",
                            CreationTime = new DateTime(2023, 12, 3, 17, 51, 44),
                            ExpiryDate = new DateTime(2023, 12, 15, 1, 36, 0),
                            TotalSelections = 3,
                            RemainingSelections = 3,
                            Choices = new List<Choice>()
                            {
                                new Choice
                                {
                                    Title = "108",
                                    Selections = new List<Selection>()
                                    {
                                    new Selection
                                    {
                                     SelectorUserId = 1
                                    }
                                    ,
                                    new Selection
                                    {
                                    SelectorUserId  = 2
                                    }
                                    }
                                },
                                new Choice
                                {
                                    Title = "112",
                                    Selections = new List<Selection>()
                                    {
                                    new Selection
                                    {
                                    SelectorUserId = 3
                                    }
                                    }
                                },
                                new Choice()
                                {
                                    Title = "113",
                                    Selections = new List<Selection>()
                                    {

                                    }
                                }
                            },
                            CreatorUserId = 3
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
                dataContext.UserQuerys.AddRange(UserQuerys);
                dataContext.SaveChanges();
            }
        }
    }
}

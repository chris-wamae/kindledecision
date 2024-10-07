using KindleDecision.Data;
using KindleDecision.Interfaces;
using KindleDecision.Models;
//using AutoMapper;
//using KindleDecision.Dto;
using Microsoft.AspNetCore.Identity;
using System.Data;
using System.Numerics;
using System.Web.Helpers;

namespace KindleDecision
{
    public class Seed
    {
        private readonly DataContext dataContext;
        //private readonly UserManager<ApplicationUser> userManager;
        //private readonly Mapper mapper;
        private readonly ILogger<Seed> logger;
        private readonly IUserRepository userRepository;


        public Seed(DataContext context, UserManager<ApplicationUser> userManager, 
            //Mapper mapper,
            ILogger<Seed> logger, IUserRepository userRepository)
        {
            this.dataContext = context;
            //this.userManager = userManager;
           // this.mapper = mapper;
            this.logger = logger;
            this.userRepository = userRepository;
        }

        public void SeedDataContext()
        {   
            if (!dataContext.Users.Any(u => u.Email == "chriswamae123@gmail.com"))
            {
                var internalUser = new User()
                {
                    Email = "chriswamae123@gmail.com",
                    Language = "en",
                    UserVisibility = true,
                    Viewmode = true,
                    RefreshToken = ""

                };

                var newUser = userRepository.CreateUser(internalUser);
                //Password = "Week!Four.May@2024",
                //    FirstName = "Christopher",
                //    LastName = "Wamae",
                //    Phone = "0712345678",
                //Email = "chriswamae123@gmail.com",
                //    Password = "Week!Four.May@2024",
                //    FirstName = "Christopher",
                //    LastName = "Wamae",
                //    Phone = "0712345678",
                //    Language = "en",
                //    UserVisibility = true,
                //    Roles = new string[3] { "user", "admin", "superadmin" }

                if ( newUser == null)
                {
                    logger.LogError("Initial User Seed error");
                }

                //ApplicationUser aspUser = new ApplicationUser()
                //{
                //    UserId = newUser.Id,
                //    Email = "chriswamae123@gmail.com"
                //};

                //aspUser.UserName = aspUser.Email;

                //var result = await userManager.CreateAsync(aspUser, "Week!Four.May@2024");

                //if(!result.Succeeded) 
                //{
                //    logger.LogError("Initial Asp Seed error");

                //    foreach (var err  in result.Errors) 
                //    {
                        
                //        logger.LogError(err.Description);
                //    }
                
                //}

                //var roleResult = await userManager.AddToRoleAsync(aspUser, "superadmin");

                //if (!roleResult.Succeeded)
                //{
                //    logger.LogError("Initial Asp Seed error");

                //    foreach (var err in result.Errors)
                //    {

                //        logger.LogError(err.Description);
                //    }

                //}

                //roleResult = await userManager.AddToRoleAsync(aspUser, "admin");

                //if (!roleResult.Succeeded)
                //{
                //    logger.LogError("Initial Asp Seed error");

                //    foreach (var err in result.Errors)
                //    {

                //        logger.LogError(err.Description);
                //    }

                //}





                //List<UserQuery> UserQuerys = new List<UserQuery>()
                //{
                //    new UserQuery()
                //    {
                //        Query = new Query()
                //        {
                //            Title = "Where to go for Christmas?",
                //            CreationTime = new DateTime(2023, 12, 3, 15, 48, 44),
                //            StartDate = new DateTime(2024,1,15,0,0,0),
                //            ExpiryDate = new DateTime(2023, 12, 15, 0, 0, 0),
                //            TotalSelections = 3,
                //            RemainingSelections = 3,
                //            Choices = new List<Choice>()
                //            {
                //                new Choice
                //                {
                //                    Title = "Maldives"
                //                },
                //                new Choice
                //                {
                //                    Title = "Pueto Vallarta",
                //                    Selections = new List<Selection>(){}
                //                }
                //            },
                //            CreatorUserId = 1
                //        },
                //        User = new User()
                //        {

                //            Email = "wamae@gmail.com",
                //            Language = "en"
                //        }
                //    },
                //    new UserQuery()
                //    {
                //        Query = new Query()
                //        {
                //            Title = "Which is the greatest movie of all time?",
                //            CreationTime = new DateTime(2023, 12, 3, 17, 48, 44),
                //            StartDate = new DateTime(2024,1,15,0,0,0),
                //            ExpiryDate = new DateTime(2023, 12, 15, 1, 0, 0),
                //            TotalSelections = 3,
                //            RemainingSelections = 3,
                //            Choices = new List<Choice>()
                //            {
                //                new Choice
                //                {
                //                    Title = "Spirited Away?"
                //                },
                //                new Choice
                //                {
                //                    Title = "Avengers: Endgame"
                //                },
                //                new Choice()
                //                {
                //                    Title = "X-Men: Days of future past"
                //                }
                //            },
                //            CreatorUserId   =  2,
                //        },
                //        User = new User()
                //        {
                //            Email = "chris@gmail.com",
                //            Language = "en"
                //        }
                //    },
                //    new UserQuery()
                //    {
                //        Query = new Query()
                //        {
                //            Title = "What's the age of the oldest human alive?",
                //            CreationTime = new DateTime(2023, 12, 3, 17, 51, 44),
                //            StartDate = new DateTime(2024,1,15,0,0,0),
                //            ExpiryDate = new DateTime(2023, 12, 15, 1, 36, 0),
                //            TotalSelections = 3,
                //            RemainingSelections = 3,
                //            Choices = new List<Choice>()
                //            {
                //                new Choice
                //                {
                //                    Title = "108"
                //                },
                //                new Choice
                //                {
                //                    Title = "112"
                //                },
                //                new Choice()
                //                {
                //                    Title = "113"
                //                }
                //            },
                //            CreatorUserId = 3
                //        },
                //        User = new User()
                //        {
                //            Email = "troller@gmail.com",
                //            Language = "en"
                //        }
                //    }
                //};
                //dataContext.UserQuerys.AddRange(UserQuerys);
            }
        }
    }
}

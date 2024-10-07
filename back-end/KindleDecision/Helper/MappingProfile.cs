using AutoMapper;
using KindleDecision.Models;
using KindleDecision.Dto;
using KindleDecision.Data;

namespace KindleDecision.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<Query, QueryDto>();
            CreateMap<Selection, SelectionDto>();
<<<<<<< HEAD
            CreateMap<User, UserDto>();
=======
            CreateMap<ApplicationUser, UserDto>().ReverseMap();
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
            CreateMap<Choice, ChoiceDto>();
            CreateMap<SelectionDto, Selection>();
            CreateMap<UserDto, User>();
            CreateMap<ChoiceDto, Choice>();
            CreateMap<QueryDto, Query>();
<<<<<<< HEAD
=======
            CreateMap<Selection, Selection>();
            CreateMap<User,Participant>();
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        }
    }
}

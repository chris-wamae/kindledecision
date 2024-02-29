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
            CreateMap<User, UserDto>();
            CreateMap<Choice, ChoiceDto>();
            CreateMap<SelectionDto, Selection>();
            CreateMap<UserDto, User>();
            CreateMap<ChoiceDto, Choice>();
            CreateMap<QueryDto, Query>();
        }
    }
}

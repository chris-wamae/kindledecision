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
            CreateMap<Election, ElectionDto>();
            CreateMap<Vote, VoteDto>();
            CreateMap<User, UserDto>();
            CreateMap<Choice, ChoiceDto>();
            CreateMap<VoteDto, Vote>();
            CreateMap<UserDto, User>();
            CreateMap<ChoiceDto, Choice>();
            CreateMap<ElectionDto, Election>();
        }
    }
}

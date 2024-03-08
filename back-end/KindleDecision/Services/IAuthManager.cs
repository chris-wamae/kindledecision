using KindleDecision.Dto;

namespace KindleDecision.Services
{
    public interface IAuthManager
    {
        Task<bool> ValidateUser(LoginUserDto user);
        Task<string> CreateToken(); 
    }
}

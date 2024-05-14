using KindleDecision.Dto;
using System.Security.Claims;

namespace KindleDecision.Services
{
    public interface IAuthManager
    {
        Task<bool> ValidateUser(LoginUserDto user);
        Task<string> CreateToken();

        Task<string> CreateToken(List<Claim> authClaims);
        string GenerateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token);
    }
}

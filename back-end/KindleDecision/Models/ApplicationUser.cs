using Microsoft.AspNetCore.Identity;

namespace KindleDecision.Models
{
    public class ApplicationUser : IdentityUser
    {
    public int UserId { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime RefreshTokenExpiryTime { get; set; }

    }
}

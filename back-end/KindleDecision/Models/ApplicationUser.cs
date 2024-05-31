using Microsoft.AspNetCore.Identity;

namespace KindleDecision.Models
{
    public class ApplicationUser : IdentityUser
    {
    public int UserId { get; set; }
    }
}

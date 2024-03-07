using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using KindleDecision.Data;

namespace KindleDecision.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
    private readonly UserManager<ApiUser> _userManager;
    }
}

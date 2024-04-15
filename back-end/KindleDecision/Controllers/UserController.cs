using KindleDecision.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KindleDecision.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController : Controller
    {
    private IUserRepository _userRepository;
    public UserController(IUserRepository userRepository) 
     {
        _userRepository = userRepository;
     }

    [Authorize]
    [HttpGet("current-user")]
     public IActionResult GetCurrentUser () 
      {
            var userId = HttpContext.Session.GetInt32("userId");

            if (userId != null)
            {
                var user = _userRepository.GetUser((int)userId);

                return Ok(user.Username);

            }
            else 
            {
                ModelState.AddModelError("", $"could not find user with Id: {userId}");
                return StatusCode(404, ModelState); 
            }

            
      }
    }
}

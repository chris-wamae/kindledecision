using KindleDecision.Models;
using KindleDecision.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace KindleDecision.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IQueryRepository _queryRepository;
        private readonly IMapper _mapper;
        private readonly IUserSelectedInQueryRepository _userSelectedInQueryRepository;

        public UserController(
            IUserRepository userRepository,
            IQueryRepository queryRepository,
            IMapper mapper,
            IUserSelectedInQueryRepository userSelectedInQueryRepository
        )
        {
            _userRepository = userRepository;
            _queryRepository = queryRepository;
            _mapper = mapper;
            _userSelectedInQueryRepository = userSelectedInQueryRepository;
        }

        [Authorize]
        [HttpGet("current-user")]
        public IActionResult GetCurrentUser()
        {
            var userId = HttpContext.Session.GetInt32("userId");

            if (userId != null)
            {
                var user = _userRepository.GetUser((int)userId);

                return Ok(user.Id);
            }
            else
            {
                ModelState.AddModelError("", $"could not find user with Id: {userId}");
                return StatusCode(404, ModelState);
            }
        }

        [Authorize]
        [HttpGet("dashboard-details/{userId}")]
        public IActionResult GetUserDashboardDetails(int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userRepository.GetUser(userId);

            if (user == null)
            {
                ModelState.AddModelError("", "User not found");
                return BadRequest(ModelState);
            }

            return Ok(
                new
                {
                    Email = user.Email,
                    UserVisibility = user.UserVisibility,
                    ViewMode = user.Viewmode,
                }
            );
            ;
        }

        [HttpGet("get-query-participants/{queryId}")]
        public IActionResult GetQueryParticipats(int queryId)
        {
            if (!_queryRepository.QueryExists(queryId))
            {
                return BadRequest("Query does not exist");
            }

            var participants = _mapper.Map<List<Participant>>(
                _userRepository.GetUsersByQuery(queryId)
            );

            foreach(var participant in participants)
            {
                participant.Status = _userSelectedInQueryRepository.UserHasSelectedInQuery(queryId, participant.Id);
            }

            return Ok(participants);
        }

        [HttpPost("user-exists")]
        public IActionResult UserExists(UserEmail userEmail)
        {
            if (!_userRepository.UserExists(userEmail))
            {
                return Ok(new { Result = false });
            }

            return Ok(new { Result = true });
        }

    }
}

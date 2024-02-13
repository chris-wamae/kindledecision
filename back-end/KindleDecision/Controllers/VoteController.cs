using KindleDecision.Models;
using KindleDecision.Data;
using KindleDecision.Interfaces;
using AutoMapper;
using KindleDecision.Dto;
using Microsoft.AspNetCore.Mvc;

namespace KindleDecision.Controllers
{
    [Route("choice/vote")]
    [ApiController]
    public class VoteController : Controller
    {
        private readonly DataContext _dataContext;
        private readonly IVoteRepository _voteRepository;
        private readonly IMapper _mapper;
        private readonly IChoiceRepository _choiceRepository;

        public VoteController(
            DataContext dataContext,
            IVoteRepository voteRepository,
            IMapper mapper,
            IChoiceRepository choiceRepository
        )
        {
            _dataContext = dataContext;
            _voteRepository = voteRepository;
            _mapper = mapper;
            _choiceRepository = choiceRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<VoteDto>))]
        public IActionResult GetVotes()
        {
            var votes = _mapper.Map<List<VoteDto>>(_voteRepository.GetAllVotes());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(votes);
        }

        [HttpGet("{voteId}")]
        [ProducesResponseType(200, Type = typeof(VoteDto))]
        [ProducesResponseType(400)]
        public IActionResult GetVote(int id)
        {
            if (!_voteRepository.VoteExists(id))
            {
                return NotFound();
            }

            var vote = _mapper.Map<VoteDto>(_voteRepository.GetVote(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(vote);
        }

        [HttpGet("get-votes-by-user/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<VoteDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetVotesByUser(int userId)
        {
            var votes = _mapper.Map<List<VoteDto>>(_voteRepository.GetVotesByUser(userId));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(votes);
        }

        [HttpPost("{choiceId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateVote(int electionId, int userId, int choiceId, VoteDto voteDto)
        {
            List<Vote> votes = _voteRepository.GetVotesByUser(userId).ToList();

            if (votes.Any(v => v.Choice.Election.Id == electionId))
            {
                ModelState.AddModelError("", "This user has already voted in this election");
                return StatusCode(422, ModelState);
            }



            if (voteDto == null)
            {
                return BadRequest(ModelState);
            }

            var vote = _dataContext.Votes
                .Where(v => v.VoterUserId == voteDto.VoterUserId)
                .FirstOrDefault();

            if (vote != null)
            {
                ModelState.AddModelError("", "Error, this vote already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var voteCreate = _mapper.Map<Vote>(voteDto);
        }
    }
}

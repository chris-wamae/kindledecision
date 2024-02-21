using AutoMapper;
using KindleDecision.Data;
using KindleDecision.Dto;
using KindleDecision.Interfaces;
using KindleDecision.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

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
        public IActionResult GetVote(int voteId)
        {
            if (!_voteRepository.VoteExists(voteId))
            {
                return NotFound();
            }

            var vote = _mapper.Map<VoteDto>(_voteRepository.GetVote(voteId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(vote);
        }

        [HttpGet("get-votes-by-choice/{choiceId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<VoteDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetVoteByChoice(int choiceId)
        {
            if (!_choiceRepository.ChoiceExists(choiceId))
            {
                ModelState.AddModelError("", "This choice does not exist");

                return StatusCode(404, ModelState);
            }

            var votes = _mapper.Map<List<VoteDto>>(_voteRepository.GetVotesByChoice(choiceId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(votes);
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
        public IActionResult CreateVote(
            [Required] int electionId,
            [Required] int userId,
            int choiceId,
            VoteDto voteDto
        )
        {
            List<Vote> userVotes = _voteRepository.GetVotesByUser(userId).ToList();

            List<Vote> choiceVotes = _voteRepository.GetVotesByChoice(choiceId).ToList();

            bool hasVoted = false;

            foreach (Vote cv in choiceVotes)
            {
                if (!hasVoted)
                {
                    if(userVotes.Any(v => v.Id == cv.Id))
                    {
                        hasVoted = true;
                    }
                }
            }

            if (hasVoted)
            {
                ModelState.AddModelError("", "This user has already voted in this election");
                return StatusCode(422, ModelState);
            }

            if (voteDto == null)
            {
                return BadRequest(ModelState);
            }

            //var vote = _dataContext.Votes
            //    .Where(v => v.VoterUserId == voteDto.VoterUserId)
            //    .FirstOrDefault();

            //if (vote != null)
            //{
            //    ModelState.AddModelError("", "Error, this vote already exists");
            //    return StatusCode(422, ModelState);
            //}

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var voteCreate = _mapper.Map<Vote>(voteDto);

            if (!_voteRepository.CreateVote(choiceId, voteCreate))
            {
                ModelState.AddModelError("", "Something went wrong while saving the vote");

                return StatusCode(500, ModelState);
            }

            return Ok(voteCreate);
        }

        [HttpDelete("{voteId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteVote(int voteId)
        {
            if(!_voteRepository.VoteExists(voteId))
            {
                return NotFound();
            }

            var voteRemove  = _voteRepository.GetVote(voteId);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!_voteRepository.DeleteVote(voteRemove))
            {
                ModelState.AddModelError("", "Something went wrong while deleting");
                return StatusCode(500, ModelState);
            } 

            return NoContent();
        }

    }
}

using KindleDecision.Interfaces;
using KindleDecision.Models;
using AutoMapper;
using KindleDecision.Dto;
using Microsoft.AspNetCore.Mvc;

namespace KindleDecision.Controllers
{
    [Route("election")]
    [ApiController]
    public class ElectionController : Controller
    {
        private readonly IElectionRepository _electionRepository;
        private readonly IMapper _mapper;

        public ElectionController(IElectionRepository electionRepository, IMapper mapper)
        {
            _electionRepository = electionRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Election>))]
        public IActionResult GetElections()
        {
            var elections = _mapper.Map<List<ElectionDto>>(_electionRepository.GetAllElections());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(elections);
        }

        [HttpGet("{electionId}")]
        [ProducesResponseType(200, Type = typeof(Election))]
        [ProducesResponseType(400)]
        public IActionResult GetElection(int electionId)
        {
            if (!_electionRepository.ElectionExists(electionId))
                return NotFound();

            var election = _mapper.Map<ElectionDto>(_electionRepository.GetElection(electionId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(election);
        }

        [HttpGet("created-elections/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Election>))]
        [ProducesResponseType(400)]
   
        public IActionResult GetElectionsByCreator(int userId) 
        {
         var elections = _mapper.Map<List<ElectionDto>>(_electionRepository.GetElectionsByCreator(userId));
         if(!ModelState.IsValid)
            {
                return BadRequest();
            }

         return Ok(elections);  

        }






        [HttpGet("user-elections/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Election>))]
        public IActionResult GetElectionsByUser(int userId)
        {
            var elections = _mapper.Map<List<ElectionDto>>(
                _electionRepository.GetElectionsByUser(userId)
            );

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(elections);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateElection([FromBody] ElectionDto electionCreate)
        {
         if(electionCreate == null)
            {
                return BadRequest(ModelState);
            }

         if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var electionMap = _mapper.Map<Election>(electionCreate);

        if(!_electionRepository.CreateElection(electionMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
        return Ok(electionMap);
        }


        [HttpPut("{electionId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]

        public IActionResult UpdateElection(int electionId, [FromBody] ElectionDto updateElection) 
        {
            if (updateElection == null)
                return BadRequest(ModelState);

            if(!_electionRepository.ElectionExists(electionId))
            {
                return NotFound();
            }

            if(electionId != updateElection.Id)
            {
                return BadRequest(ModelState);
            }

            var updatedElectionMap = _mapper.Map<Election>(updateElection);

            if(!_electionRepository.UpdateElection(updatedElectionMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating the Election");
                return StatusCode(500, ModelState);
            }

            return Ok(updatedElectionMap);
        }

        [HttpDelete("{electionId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteElection(int electionId) 
        {
            if (!_electionRepository.ElectionExists(electionId))
            {
                return NotFound();
            }

            var electionToDelete = _electionRepository.GetElection(electionId);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!_electionRepository.DeleteElection(electionToDelete))
            {
                ModelState.AddModelError("", "Something went wrong while deleting the Election");
                return StatusCode(500, ModelState); 
            }

            return NoContent();
        }
    }
}

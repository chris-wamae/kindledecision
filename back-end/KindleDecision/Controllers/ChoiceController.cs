using KindleDecision.Models;
using KindleDecision.Interfaces;
using KindleDecision.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace KindleDecision.Controllers
{
    [Route("election/choice")]
    [ApiController]
    public class ChoiceController : Controller
    {
        private readonly IChoiceRepository _choiceRepository;
        private readonly IElectionRepository _electionRepository;
        private readonly IMapper _mapper;

        public ChoiceController(IChoiceRepository choiceRepository, IMapper mapper, IElectionRepository electionRepository)
        {
            _choiceRepository = choiceRepository;
            _mapper = mapper;
            _electionRepository = electionRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]

        public IActionResult GetAllChoices()
        {
            var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetAllChoices());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(choices);

        }

        [HttpGet("{choiceId}")]
        [ProducesResponseType(200, Type = typeof(Choice))]
        [ProducesResponseType(400)]

        public IActionResult GetChoice(int choiceId)
        {

            if (!_choiceRepository.ChoiceExists(choiceId))
            {
                return NotFound();
            }

            var choice = _mapper.Map<ChoiceDto>(_choiceRepository.GetChoice(choiceId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(choice);

        }

        [HttpGet("get-election-choices/{electionId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]

        public IActionResult GetChoicesByElection(int electionId)
        {

            var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetChoicesByElection(electionId));

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (choices == null)
            {
                ModelState.AddModelError("", "Something went wrong while getting the choices");

                return StatusCode(500, ModelState);
            }

            return Ok(choices);

        }


        [HttpGet("get-choices-by-user-vote/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]

        public IActionResult GetChoicesByUserId(int userId)
        {
            var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetChoicesByUserVote(userId));

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(choices);

        }

        [HttpPost("{electionId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateChoice( int electionId, [FromBody] ChoiceDto choiceCreate)
        {
            if (choiceCreate == null)
                return BadRequest(ModelState);

          
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);  
            }

            var choiceMap = _mapper.Map<Choice>(choiceCreate);

            if(!_choiceRepository.CreateChoice(electionId, choiceMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving the Choice");
                return StatusCode(500, ModelState);
            }

            return Ok(choiceMap);   

        }

        [HttpPut("{choiceId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]

        public IActionResult UpdateChoice(int choiceId, ChoiceDto updateChoice)
        {
         if(updateChoice == null)
            {
            return BadRequest(ModelState);  
            }

            if (!_choiceRepository.ChoiceExists(choiceId))
                return NotFound();

            if(choiceId != updateChoice.Id)
                return BadRequest(ModelState);

            var updatedChoiceMap = _mapper.Map<Choice>(updateChoice);

            if(!_choiceRepository.UpdateChoice(choiceId, updatedChoiceMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating the Choice");
                return StatusCode(500, ModelState);
            }

            return Ok(updatedChoiceMap);

        }


        [HttpDelete("{choiceId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]

        public IActionResult DeleteChoice(int choiceId) 
        {
            if(!_choiceRepository.ChoiceExists(choiceId))
                return NotFound();

            var choiceToDelete = _choiceRepository.GetChoice(choiceId);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!_choiceRepository.DeleteChoice(choiceToDelete))
                {
                ModelState.AddModelError("", "Something went wrong while Deleting");
                return StatusCode(500, ModelState);
                }

            return NoContent();
        }

    }
}

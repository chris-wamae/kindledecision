using KindleDecision.Models;
using KindleDecision.Interfaces;
using KindleDecision.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
=======
using Microsoft.AspNetCore.Authorization;
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

namespace KindleDecision.Controllers
{
    [Route("query/choice")]
    [ApiController]
    public class ChoiceController : Controller
    {
        private readonly IChoiceRepository _choiceRepository;
        private readonly IQueryRepository _queryRepository;
        private readonly IMapper _mapper;

        public ChoiceController(IChoiceRepository choiceRepository, IMapper mapper, IQueryRepository queryRepository)
        {
            _choiceRepository = choiceRepository;
            _mapper = mapper;
            _queryRepository = queryRepository;
        }

<<<<<<< HEAD
=======
        [Authorize(Roles = "Administrator,SuperAdmin")]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
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

<<<<<<< HEAD
=======
        [Authorize]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        [HttpGet("{choiceId}")]
        [ProducesResponseType(200, Type = typeof(Choice))]
        [ProducesResponseType(400)]

        public IActionResult GetChoice(int choiceId)
        {

            if (!_choiceRepository.ChoiceExists(choiceId))
            {
<<<<<<< HEAD
                return NotFound();
=======
                return NotFound($"Choice with an id of {choiceId} does not exist");
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
            }

            var choice = _mapper.Map<ChoiceDto>(_choiceRepository.GetChoice(choiceId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(choice);

        }

<<<<<<< HEAD
        [HttpGet("get-query-choices/{queryId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]
=======
        [Authorize]
        [HttpGet("get-query-choices/{queryId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ChoiceWithSelectionCount>))]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        public IActionResult GetChoicesByQuery(int queryId)
        {

<<<<<<< HEAD
            var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetChoicesByQuery(queryId));

            if (!ModelState.IsValid)
            {
                return BadRequest();
=======
            var choices = _choiceRepository.GetChoicesByQuery(queryId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
            }
            if (choices == null)
            {
                ModelState.AddModelError("", "Something went wrong while getting the choices");

                return StatusCode(500, ModelState);
            }

<<<<<<< HEAD
            return Ok(choices);
=======
            return Ok(choices.OrderByDescending(c => c.SelectionCount).ToList());
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        }


<<<<<<< HEAD
        [HttpGet("get-choices-by-user-vote/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]

        public IActionResult GetChoicesByUserId(int userId)
        {
            var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetChoicesByUserSelection(userId));

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(choices);

        }

=======


        //[HttpGet("get-choices-by-user-vote/{userId}")]
        //[ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]

        //public IActionResult GetChoicesByUserId(int userId)
        //{
        //    var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetChoicesByUserSelection(userId));

        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest();
        //    }

        //    return Ok(choices);

        //}



        [Authorize]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        [HttpPost("{queryId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateChoice( int queryId, [FromBody] ChoiceDto choiceCreate)
        {
            if (choiceCreate == null)
                return BadRequest(ModelState);

          
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);  
            }

            var choiceMap = _mapper.Map<Choice>(choiceCreate);

            if(!_choiceRepository.CreateChoice(queryId, choiceMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving the Choice");
                return StatusCode(500, ModelState);
            }

            return Ok(choiceMap);   

        }

<<<<<<< HEAD
=======
        [Authorize]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
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
<<<<<<< HEAD
                return NotFound();
=======
                return NotFound($"Choice with an id of {choiceId} does not exist");
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

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

<<<<<<< HEAD

=======
        [Authorize]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        [HttpDelete("{choiceId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]

        public IActionResult DeleteChoice(int choiceId) 
        {
            if(!_choiceRepository.ChoiceExists(choiceId))
<<<<<<< HEAD
                return NotFound();

            var choiceToDelete = _choiceRepository.GetChoice(choiceId);
=======
                return NotFound($"Choice with an id of {choiceId} does not exist");

            //var choiceToDelete = _choiceRepository.GetChoice(choiceId);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

<<<<<<< HEAD
            if(!_choiceRepository.DeleteChoice(choiceToDelete))
=======
            if(!_choiceRepository.DeleteChoice(choiceId))
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
                {
                ModelState.AddModelError("", "Something went wrong while Deleting");
                return StatusCode(500, ModelState);
                }

            return NoContent();
        }

    }
}

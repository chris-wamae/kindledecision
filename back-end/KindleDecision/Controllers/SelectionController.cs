using AutoMapper;
using KindleDecision.Data;
using KindleDecision.Dto;
using KindleDecision.Interfaces;
using KindleDecision.Models;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
=======
using Microsoft.AspNetCore.Authorization;
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
using System.ComponentModel.DataAnnotations;

namespace KindleDecision.Controllers
{
    [Route("choice/selection")]
    [ApiController]
    public class SelectionController : Controller
    {
        private readonly DataContext _dataContext;
        private readonly ISelectionRepository _selectionRepository;
        private readonly IMapper _mapper;
        private readonly IChoiceRepository _choiceRepository;
<<<<<<< HEAD
=======
        private readonly IUserSelectedInQueryRepository _userSelectedInQueryRepository;
        private readonly IUserRepository _userRepository;
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

        public SelectionController(
            DataContext dataContext,
            ISelectionRepository selectionRepository,
            IMapper mapper,
<<<<<<< HEAD
            IChoiceRepository choiceRepository
=======
            IChoiceRepository choiceRepository,
            IUserSelectedInQueryRepository userSelectedInQueryRepository,
            IUserRepository userRepository
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        )
        {
            _dataContext = dataContext;
            _selectionRepository = selectionRepository;
            _mapper = mapper;
            _choiceRepository = choiceRepository;
<<<<<<< HEAD
        }

=======
            _userSelectedInQueryRepository = userSelectedInQueryRepository;
            _userRepository = userRepository;
        }

        [Authorize(Roles = "Administrator,SuperAdmin")]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SelectionDto>))]
        public IActionResult GetSelections()
        {
<<<<<<< HEAD
            var selections = _mapper.Map<List<SelectionDto>>(_selectionRepository.GetAllSelections());
=======
            var selections = _mapper.Map<List<SelectionDto>>(
                _selectionRepository.GetAllSelections()
            );
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(selections);
        }

<<<<<<< HEAD
=======
        [Authorize]
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        [HttpGet("{selectionId}")]
        [ProducesResponseType(200, Type = typeof(SelectionDto))]
        [ProducesResponseType(400)]
        public IActionResult GetSelection(int selectionId)
        {
            if (!_selectionRepository.SelectionExists(selectionId))
            {
<<<<<<< HEAD
                return NotFound();
            }

            var selection = _mapper.Map<SelectionDto>(_selectionRepository.GetSelection(selectionId));
=======
                return NotFound($"Selection with an id of {selectionId} does not exist");
            }

            var selection = _mapper.Map<SelectionDto>(
                _selectionRepository.GetSelection(selectionId)
            );
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(selection);
        }

<<<<<<< HEAD
=======
        [Authorize] 
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
        [HttpGet("get-selections-by-choice/{choiceId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SelectionDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetSelectionByChoice(int choiceId)
        {
            if (!_choiceRepository.ChoiceExists(choiceId))
            {
                ModelState.AddModelError("", "This choice does not exist");

                return StatusCode(404, ModelState);
            }

<<<<<<< HEAD
            var selections = _mapper.Map<List<SelectionDto>>(_selectionRepository.GetSelectionsByChoice(choiceId));
=======
            var selections = _mapper.Map<List<SelectionDto>>(
                _selectionRepository.GetSelectionsByChoice(choiceId)
            );
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(selections);
        }

<<<<<<< HEAD
        [HttpGet("get-selections-by-user/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SelectionDto>))]
        [ProducesResponseType(400)]
        public IActionResult GetSelectionsByUser(int userId)
        {
            var selections = _mapper.Map<List<SelectionDto>>(_selectionRepository.GetSelectionsByUser(userId));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(selections);
        }

        [HttpPost("{choiceId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateSelection(
            [Required] int queryId,
            [Required] int userId,
            int choiceId,
            SelectionDto selectionDto
        )
        {
            List<Selection> userSelections = _selectionRepository.GetSelectionsByUser(userId).ToList();

            List<Selection> choiceSelections = _selectionRepository.GetSelectionsByChoice(choiceId).ToList();

            bool hasVoted = false;

            foreach (Selection cs in choiceSelections)
            {
                if (!hasVoted)
                {
                    if(userSelections.Any(s => s.Id == cs.Id))
                    {
                        hasVoted = true;
                    }
                }
            }

=======
        //[HttpGet("get-selections-by-user/{userId}")]
        //[ProducesResponseType(200, Type = typeof(IEnumerable<SelectionDto>))]
        //[ProducesResponseType(400)]
        //public IActionResult GetSelectionsByUser(int userId)
        //{
        //    var selections = _mapper.Map<List<SelectionDto>>(
        //        _selectionRepository.GetSelectionsByUser(userId)
        //    );
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    return Ok(selections);
        //}
        [Authorize]
        [HttpPost("participate")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateSelection(MakeSelection makeSelection)
        {
            //List<Selection> userSelections = _selectionRepository.GetSelectionsByUser(userId).ToList();

            //List<Selection> choiceSelections = _selectionRepository.GetSelectionsByChoice(choiceId).ToList();


            //foreach (Selection cs in choiceSelections)
            //{
            //    if (!hasVoted)
            //    {
            //        if(userSelections.Any(s => s.Id == cs.Id))
            //        {
            //            hasVoted = true;
            //        }
            //    }
            //}

            //var userId = HttpContext.Session.GetInt32("userId");

            if(!_userRepository.UserExists(makeSelection.UserId))
            {
                ModelState.AddModelError("", "There was an error retrieving the current user");
                return StatusCode(500, ModelState);
            }

            bool hasVoted = _userSelectedInQueryRepository.UserHasSelectedInQuery(makeSelection.QueryId, makeSelection.UserId);

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
            if (hasVoted)
            {
                ModelState.AddModelError("", "This user has already voted in this election");
                return StatusCode(422, ModelState);
            }

<<<<<<< HEAD
            if (selectionDto == null)
            {
=======
            SelectionDto selectionDto = new SelectionDto() { SelectorUserId = makeSelection.UserId,
            
            Reason = makeSelection.Reason,
            };

            if (selectionDto == null)
            {   
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
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

<<<<<<< HEAD
            var selectionCreate = _mapper.Map<Selection>(selectionDto);

            if (!_selectionRepository.CreateSelection(choiceId, selectionCreate))
            {
=======
            selectionDto.SelectorUserId = makeSelection.UserId;


            var selectionCreate = _mapper.Map<Selection>(selectionDto);

            selectionCreate.UserSelectedInQuery = new UserSelectedInQuery() { UserId = makeSelection.UserId, QueryId = makeSelection.QueryId };


            if (!_selectionRepository.CreateSelection(makeSelection.ChoiceId, selectionCreate))
            {   
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
                ModelState.AddModelError("", "Something went wrong while saving the selection");

                return StatusCode(500, ModelState);
            }

<<<<<<< HEAD
            return Ok(selectionCreate);
        }

        [HttpDelete("{selectionId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteSelection(int selectionId)
        {
            if(!_selectionRepository.SelectionExists(selectionId))
            {
                return NotFound();
            }

            var selectionRemove  = _selectionRepository.GetSelection(selectionId);

            if(!ModelState.IsValid)
=======
      //      if (
      //    !_userSelectedInQueryRepository.CreateUserSelectedInQuery(
      //        new UserSelectedInQuery() { UserId = (int)userId, QueryId = queryId }
      //    )
      //)
      //      {
      //          ModelState.AddModelError(
      //              "",
      //              "Something went wrong while saving the UserSelectedInQuery"
      //          );

      //          return StatusCode(500, ModelState);
      //      }

            return Ok(new
            {
            Result = "successful"
            });
        }

        [Authorize]
        [HttpDelete("{selectionId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteSelection(int selectionId)
        {
            if (!_selectionRepository.SelectionExists(selectionId))
            {
                return NotFound($"Selection with an id of {selectionId} does not exist");
            }

            var selectionRemove = _selectionRepository.GetSelection(selectionId);

            if (!ModelState.IsValid)
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
            {
                return BadRequest(ModelState);
            }

<<<<<<< HEAD
            if(!_selectionRepository.DeleteSelection(selectionRemove))
            {
                ModelState.AddModelError("", "Something went wrong while deleting the selection");
                return StatusCode(500, ModelState);
            } 

            return NoContent();
        }

=======
            if (!_selectionRepository.DeleteSelection(selectionRemove))
            {
                ModelState.AddModelError("", "Something went wrong while deleting the selection");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
    }
}

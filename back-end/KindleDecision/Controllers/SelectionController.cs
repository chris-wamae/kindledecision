using AutoMapper;
using KindleDecision.Data;
using KindleDecision.Dto;
using KindleDecision.Interfaces;
using KindleDecision.Models;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IUserSelectedInQueryRepository _userSelectedInQueryRepository;

        public SelectionController(
            DataContext dataContext,
            ISelectionRepository selectionRepository,
            IMapper mapper,
            IChoiceRepository choiceRepository,
            IUserSelectedInQueryRepository userSelectedInQueryRepository
        )
        {
            _dataContext = dataContext;
            _selectionRepository = selectionRepository;
            _mapper = mapper;
            _choiceRepository = choiceRepository;
            _userSelectedInQueryRepository = userSelectedInQueryRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<SelectionDto>))]
        public IActionResult GetSelections()
        {
            var selections = _mapper.Map<List<SelectionDto>>(
                _selectionRepository.GetAllSelections()
            );

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(selections);
        }

        [HttpGet("{selectionId}")]
        [ProducesResponseType(200, Type = typeof(SelectionDto))]
        [ProducesResponseType(400)]
        public IActionResult GetSelection(int selectionId)
        {
            if (!_selectionRepository.SelectionExists(selectionId))
            {
                return NotFound();
            }

            var selection = _mapper.Map<SelectionDto>(
                _selectionRepository.GetSelection(selectionId)
            );

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(selection);
        }

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

            var selections = _mapper.Map<List<SelectionDto>>(
                _selectionRepository.GetSelectionsByChoice(choiceId)
            );

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(selections);
        }

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

        [HttpPost("{queryId}/{choiceId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateSelection( int queryId, int choiceId)
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

            var userId = HttpContext.Session.GetInt32("userId");

            if(userId == null)
            {
                ModelState.AddModelError("", "There was an error retrieving the current user");
                return StatusCode(500, ModelState);
            }

            bool hasVoted = _userSelectedInQueryRepository.UserHasSelectedInQuery(queryId, (int)userId);

            if (hasVoted)
            {
                ModelState.AddModelError("", "This user has already voted in this election");
                return StatusCode(422, ModelState);
            }

            SelectionDto selectionDto = new SelectionDto() { SelectorUserId = (int)userId };

            if (selectionDto == null)
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

            selectionDto.SelectorUserId = (int)userId;


            var selectionCreate = _mapper.Map<Selection>(selectionDto);

            if (!_selectionRepository.CreateSelection(choiceId, selectionCreate))
            {
                ModelState.AddModelError("", "Something went wrong while saving the selection");

                return StatusCode(500, ModelState);
            }

            if (
          !_userSelectedInQueryRepository.CreateUserSelectedInQuery(
              new UserSelectedInQuery() { UserId = (int)userId, QueryId = queryId }
          )
      )
            {
                ModelState.AddModelError(
                    "",
                    "Something went wrong while saving the UserSelectedInQuery"
                );

                return StatusCode(500, ModelState);
            }




            return Ok(selectionCreate);
        }

        [HttpDelete("{selectionId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteSelection(int selectionId)
        {
            if (!_selectionRepository.SelectionExists(selectionId))
            {
                return NotFound();
            }

            var selectionRemove = _selectionRepository.GetSelection(selectionId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_selectionRepository.DeleteSelection(selectionRemove))
            {
                ModelState.AddModelError("", "Something went wrong while deleting the selection");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}

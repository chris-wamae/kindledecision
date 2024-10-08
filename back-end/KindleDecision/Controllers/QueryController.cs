﻿using KindleDecision.Interfaces;
using KindleDecision.Models;
using AutoMapper;
using KindleDecision.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace KindleDecision.Controllers
{   
    [Route("query")]
    [ApiController]
    public class QueryController : Controller
    {
        private readonly IQueryRepository _queryRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IUserSelectedInQueryRepository _userSelectedInQueryRepository;

        public QueryController(
            IQueryRepository queryRepository,
            IMapper mapper,
            IUserRepository userRepository,
            IUserSelectedInQueryRepository userSelectedInQueryRepository
        )
        {
            _queryRepository = queryRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _userSelectedInQueryRepository = userSelectedInQueryRepository;
        }

        [Authorize(Roles = "Admininistrator,SuperAdmin")]
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        public IActionResult GetQueries()
        {
            var querys = _mapper.Map<List<QueryDto>>(_queryRepository.GetAllQuerys());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(querys);
        }

        [Authorize]
        [HttpGet("{queryId}")]
        [ProducesResponseType(200, Type = typeof(Query))]
        [ProducesResponseType(400)]
        public IActionResult GetQuery(int queryId)
        {
            if (!_queryRepository.QueryExists(queryId))
                return NotFound($"Query with an id of {queryId} does not exist");

            var query = _mapper.Map<QueryDto>(_queryRepository.GetQuery(queryId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(query);
        }

        [Authorize]
        [HttpGet("created-querys/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        [ProducesResponseType(400)]
        public IActionResult GetQuerysByCreator(int userId)
        {
            if (userId == null)
            {
                ModelState.AddModelError("", "There was a problem retrieving the current user");
                return StatusCode(500, ModelState);
            }

            var querys = _mapper.Map<List<QueryDto>>(
                _queryRepository.GetQuerysByCreator((int)userId)
            );
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(querys);
        }

        [Authorize]
        [HttpGet("user-querys/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        public IActionResult GetQueriesByUser(int userId)
        {
            if (!_userRepository.UserExists(userId))
            {
                ModelState.AddModelError("", "There was a problem retriving the current user");
                return StatusCode(500, ModelState);
            }

            var querys = _mapper.Map<List<QueryDto>>(_queryRepository.GetQuerysByUser((int)userId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(querys);
        }

        [Authorize]
        [HttpGet("pending-querys/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        public IActionResult GetUserPendingQueries(int userId)
        {
            if (!_userRepository.UserExists(userId))
            {
                ModelState.AddModelError("", "There was a problem retriving the current user");
                return StatusCode(500, ModelState);
            }

            var selections = _userSelectedInQueryRepository
                .GetUserSelectedInQuerysByUser(userId)
                .Select(x => x.QueryId);

            var querys = _mapper.Map<List<QueryDto>>(_queryRepository.GetQuerysByUser((int)userId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(new { Selections = selections, Queries = querys });
        }

        [Authorize]
        [HttpGet("query-selection-complete/{queryId}")]
        public IActionResult QuerySelectionComplete(int queryId)
        {
            var query = _queryRepository.GetQuery(queryId);

            if (query == null)
            {
                return NotFound($"Query with an id of {queryId} does not exist");
            }

            return Ok(query.TotalSelections - query.RemainingSelections == query.TotalSelections);
        }


        [Authorize]
        [HttpGet("get-query-creator/{queryId}")]

        public IActionResult GetQueryCreator(int queryId)
        {
           var query =  _queryRepository.GetQuery(queryId);

            var queryCreator = _userRepository.GetQueryCreator(queryId);

            return Ok(new
            {
                Id = queryCreator.Id,
               Email=queryCreator.Email}
            );
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateQuery([FromBody] QueryDto queryCreate)
        {
            if (queryCreate == null)
            {
                ModelState.AddModelError("", "Invalid data was provided");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var userId = HttpContext.Session.GetInt32("userId");

            //if(userId != null)
            //{
            //    queryCreate.CreatorUserId = (int)userId;
            //}

            //else
            //{
            //    ModelState.AddModelError("", "The current user details needed to create the query could not be retrieved");
            //    return StatusCode(500, ModelState);
            //}


            var queryMap = _mapper.Map<Query>(queryCreate);

            if (!_queryRepository.CreateQuery(queryMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(queryMap);
        }

        [Authorize]
        [HttpPut("{queryId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateQuery(int queryId, [FromBody] QueryDto updateQuery)
        {
            if (updateQuery == null)
                return BadRequest(ModelState);

            if (!_queryRepository.QueryExists(queryId))
            {
                return NotFound($"Query with an id of {queryId} does not exist");
            }

            if (queryId != updateQuery.Id)
            {
                return BadRequest(ModelState);
            }

            var updatedQueryMap = _mapper.Map<Query>(updateQuery);

            var userId = HttpContext.Session.GetInt32("userId");

            if (userId != null)
            {
                ModelState.AddModelError(
                    "",
                    "The user details required to update the query could not be retrieved"
                );
                return StatusCode(500, ModelState);
            }
            else
            {
                updatedQueryMap.CreatorUserId = (int)userId;
            }

            if (!_queryRepository.UpdateQuery(updatedQueryMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating the Query");
                return StatusCode(500, ModelState);
            }

            return Ok(updatedQueryMap);
        }

        [Authorize]
        [HttpPut("total-selections")]
        [ProducesResponseType(200)]
        public IActionResult UpdateTotalSelectors(TotalSelections totalSelections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var queryCreate = _queryRepository.GetQuery(totalSelections.queryId);

            if (queryCreate == null)
            {
                return BadRequest("Query does not exist");
            }

            queryCreate.TotalSelections = totalSelections.totalSelections;
            queryCreate.RemainingSelections = totalSelections.totalSelections;

            if (!_queryRepository.UpdateQuery(queryCreate))
            {
                ModelState.AddModelError("", "Something went wrong while updating the query");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }


        [HttpPost("remaining-selections/{queryId}")]
        [ProducesResponseType(200)]
        public IActionResult UpdateRemainingSelectors(int queryId)
        {
            if(!int.TryParse(queryId.ToString(), out int qD))
            {
                BadRequest("Invalid query Id");
            };

            if(!ModelState.IsValid)
            {   
                return BadRequest(ModelState);
            }

            var queryCreate = _queryRepository.GetQuery(qD);

            if (queryCreate == null)
            {
                return NotFound($"Query with an id of {qD} does not exist");
            }

            if (queryCreate.RemainingSelections == 0)
            {
                return BadRequest("Remaining selections cannot be less that 0");
            }

            int newSelections = queryCreate.RemainingSelections - 1;

            queryCreate.RemainingSelections = newSelections;

            if (!_queryRepository.UpdateQuery(queryCreate))
            {
                ModelState.AddModelError("", "Something went wrong while updating the query");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("add-participant/{queryId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult AddParticipant(int queryId, [FromBody] UserEmail userEmail)
        {
            User user = _userRepository.GetUserByEmail(userEmail.Email);

            Query query = _queryRepository.GetQuery(queryId);

            if (user == null)
            {
                return BadRequest("A user with that email does not exist");
            }

            if (query == null)
            {
                return BadRequest("Query does not exist");
            }

            if (!_queryRepository.AddParticipant(user, query))
            {
                return StatusCode(500, "Something went wrong while adding the participant");
            }

            return Ok();
        }

        [Authorize]
        [HttpDelete("{queryId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteQuery(int queryId)
        {
            var uSIQ = _userSelectedInQueryRepository
                .GetUserSelectedInQuerysByQuery(queryId)
                .ToList();

            bool hasFail = false;

            if (uSIQ.Count() > 0)
            {
                foreach (var u in uSIQ)
                {
                    if(!_userSelectedInQueryRepository.DeleteUserSelectedInQuery(u))
                    {
                        hasFail = true;
                    };

                }
            }


            if (!_queryRepository.QueryExists(queryId))
            {
                return NotFound($"Query with an id of {queryId} does not exist");
            }

            //var queryToDelete = _queryRepository.GetQuery(queryId);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_queryRepository.DeleteQuery(queryId))
            {
                ModelState.AddModelError("", "Something went wrong while deleting the Query");
                return StatusCode(500, ModelState);
            }

            if (hasFail)
            {
                return StatusCode(500, "An error occurred deleting data associated with the query");
            }


            return NoContent();
        }

        [Authorize]
        [HttpGet("user-has-voted/{userId}/{queryId}")]
        public IActionResult UserHasVoted(int userId, int queryId)
        {
            if (!_userRepository.UserExists(userId))
            {
                return BadRequest("User does not exist");
            }
            if (!_queryRepository.QueryExists(queryId))
            {
                return BadRequest("Query does not exist");
            }

            var result = _userSelectedInQueryRepository.UserHasSelectedInQuery(queryId, userId);

            return Ok(new { Result = result });
        }
    }
}

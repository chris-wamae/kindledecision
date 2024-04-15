using KindleDecision.Interfaces;
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

        public QueryController(IQueryRepository queryRepository, IMapper mapper)
        {
            _queryRepository = queryRepository;
            _mapper = mapper;
        }

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

        [HttpGet("{queryId}")]
        [ProducesResponseType(200, Type = typeof(Query))]
        [ProducesResponseType(400)]
        public IActionResult GetQuery(int queryId)
        {
            if (!_queryRepository.QueryExists(queryId))
                return NotFound();

            var query = _mapper.Map<QueryDto>(_queryRepository.GetQuery(queryId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(query);
        }

        [HttpGet("created-querys")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        [ProducesResponseType(400)]
   
        public IActionResult GetQuerysByCreator() 
        {

         var userId = HttpContext.Session.GetInt32("userId");

        if(userId == null)
         {
                ModelState.AddModelError("", "There was a problem retrieving the current user");
                return StatusCode(500, ModelState);
         }

         var querys = _mapper.Map<List<QueryDto>>(_queryRepository.GetQuerysByCreator((int)userId));
         if(!ModelState.IsValid)
            {
                return BadRequest();
            }

         return Ok(querys);  

        }






        [HttpGet("user-querys")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        public IActionResult GetElectionsByUser()
        {
            var userId = HttpContext.Session.GetInt32("userId");    
            if(userId == null)
            {
                ModelState.AddModelError("", "There was a problem retriving the current user");
                return StatusCode(500, ModelState);
            }

            var querys = _mapper.Map<List<QueryDto>>(
                _queryRepository.GetQuerysByUser((int)userId)
            );

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(querys);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateQuery([FromBody] QueryDto queryCreate)
        {
         if(queryCreate == null)
            {
                return BadRequest(ModelState);
            }

         if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = HttpContext.Session.GetInt32("userId");

            if(userId != null)
            {
                queryCreate.CreatorUserId = (int)userId;
            }
            else
            {
                ModelState.AddModelError("", "The current user details needed to create the query could not be retrieved");
                return StatusCode(500, ModelState);
            }

         
            var queryMap = _mapper.Map<Query>(queryCreate);

        if(!_queryRepository.CreateQuery(queryMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
        return Ok(queryMap);
        }


        [HttpPut("{queryId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]

        public IActionResult UpdateQuery(int queryId, [FromBody] QueryDto updateQuery) 
        {
            if (updateQuery == null)
                return BadRequest(ModelState);

            if(!_queryRepository.QueryExists(queryId))
            {
                return NotFound();
            }

            if(queryId != updateQuery.Id)
            {
                return BadRequest(ModelState);
            }

            var updatedQueryMap = _mapper.Map<Query>(updateQuery);

            var userId = HttpContext.Session.GetInt32("userId");

            if(userId != null) 
            {
                ModelState.AddModelError("", "The user details required to update the query could not be retrieved");
                return StatusCode(500, ModelState);
            }

            else
            {

             updatedQueryMap.CreatorUserId = (int)userId;

            }

            if(!_queryRepository.UpdateQuery(updatedQueryMap))
            {
                ModelState.AddModelError("", "Something went wrong while updating the Query");
                return StatusCode(500, ModelState);
            }

            return Ok(updatedQueryMap);
        }

        [HttpDelete("{queryId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteQuery(int queryId) 
        {
            if (!_queryRepository.QueryExists(queryId))
            {
                return NotFound();
            }

            var queryToDelete = _queryRepository.GetQuery(queryId);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!_queryRepository.DeleteQuery(queryToDelete))
            {
                ModelState.AddModelError("", "Something went wrong while deleting the Query");
                return StatusCode(500, ModelState); 
            }

            return NoContent();
        }
    }
}

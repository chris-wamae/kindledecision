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

        [Authorize]
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

        [HttpGet("created-querys/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        [ProducesResponseType(400)]
   
        public IActionResult GetQuerysByCreator(int userId) 
        {
         var querys = _mapper.Map<List<QueryDto>>(_queryRepository.GetQuerysByCreator(userId));
         if(!ModelState.IsValid)
            {
                return BadRequest();
            }

         return Ok(querys);  

        }






        [HttpGet("user-querys/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Query>))]
        public IActionResult GetElectionsByUser(int userId)
        {
            var querys = _mapper.Map<List<QueryDto>>(
                _queryRepository.GetQuerysByUser(userId)
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

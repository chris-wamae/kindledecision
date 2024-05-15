using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using KindleDecision.Data;
using AutoMapper;
using KindleDecision.Dto;
using KindleDecision.Services;
using KindleDecision.Models;
using KindleDecision.Repositories;
using KindleDecision.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Text;

namespace KindleDecision.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ILogger<AccountController> _logger;
    private readonly IMapper _mapper;
    private readonly IAuthManager _authManager;
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;



    public AccountController(UserManager<ApplicationUser> userManager, ILogger<AccountController> logger, IMapper mapper, IAuthManager authManager, IUserRepository userRepository, IConfiguration configuration)
        {
            _userManager = userManager;
            _logger = logger;
            _mapper = mapper;
            _authManager = authManager;
            _userRepository = userRepository;
            _configuration = configuration;

        }


     [HttpPost]
     [Route("register")]

     public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            _logger.LogInformation($"Registration attempt for {userDto.Email}");

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = _mapper.Map<ApplicationUser>(userDto);
                var internalUser = _mapper.Map<User>(userDto);
                
                user.UserName = userDto.Email;

                internalUser = _userRepository.CreateUser(internalUser);

                if(internalUser == null)
                {
                    ModelState.AddModelError("", "Something went wrong while creating the new User");

                    return StatusCode(500, ModelState);
                } 

                user.UserId = internalUser.Id; user.Email = userDto.Email;

                var result = await _userManager.CreateAsync(user, userDto.Password);

                if(!result.Succeeded)
                {
                foreach(var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                return BadRequest(ModelState);
                }

                return Accepted();
            }

            catch (Exception ex) 
            {
             
                _logger.LogError(ex, $"Something went wrong in the {nameof(Register)}");

                return Problem($"Something went wrong in the {nameof(Register)}",statusCode:500);
            }


        }

        [HttpPost]
        [Route("login")]

        public async Task<IActionResult> Login([FromBody] LoginUserDto userDto)
        {
            _logger.LogInformation($"Login attempt for {userDto.Email}");

            if(!ModelState.IsValid)
            { 
             return BadRequest(ModelState);
            }

            try
            {
             if(!await _authManager.ValidateUser(userDto))
                {
                 return Unauthorized();
                }
                var user = await _userManager.FindByEmailAsync(userDto.Email);

                var internalUser = _userRepository.GetUser(user.UserId);

                if (internalUser == null)
                {
                    ModelState.AddModelError("", $"Something went wrong while retrieving the user with Id: {user.UserId}");

                    return StatusCode(500, ModelState);
                }
                //else
                //{
                //    HttpContext.Session.SetInt32("userId", user.UserId);
                //}

                var refreshToken = _authManager.GenerateRefreshToken();
                var jwtSettings = _configuration.GetSection("Jwt");

                var refreshTokenExpiry = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.GetSection("refreshTokenDays").Value));

                internalUser.RefreshToken = refreshToken;
                internalUser.RefreshTokenExpiryTime = refreshTokenExpiry;

                if(!_userRepository.UpdateUser(internalUser.Id, internalUser))
                {
                    ModelState.AddModelError("", "Refresh token error");
                    return StatusCode(500, ModelState);
                };
                
                return Accepted(new
                {
                    Token = await _authManager.CreateToken(),
                    RefreshToken = refreshToken,
                    RefreshTokenExpiry = refreshTokenExpiry,
                    Ud = internalUser.Id
                });
            }


            catch(Exception ex) 
            {
                _logger.LogError(ex, $"Something went wrong in the {nameof(Login)}");
                return Problem($"Something went wrong in the {nameof(Login)}", statusCode: 500);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("user-preferences/{userId}")]

        public IActionResult GetPreferences(int userId) 
        {
        if(!ModelState.IsValid) { return BadRequest(ModelState); };
        var user = _userRepository.GetUser(userId); 
         
        if(user == null)
            {
                return NotFound();
            }

            return Accepted(new {
            Visibility = user.UserVisibility,
            ViewMode = user.Viewmode,
            });;
        
        }

        [HttpPost]
        [Route("refresh-token")]

        public async Task<IActionResult> RefreshToken(Tokens tokenObject)
        {
            if(tokenObject.accessToken == null || tokenObject.refreshToken == null )
            {
               return BadRequest("Invalid data provided");
            }

            string? _accessToken = tokenObject.accessToken;
            string? _refreshToken = tokenObject.refreshToken;

            var principal = _authManager.GetPrincipalFromExpiredToken(_accessToken);

            if(principal == null)
            {
                return BadRequest("Invalid access token");
            }

            string username = principal.Identity.Name;

            var user = await _userManager.FindByEmailAsync(username);

            if(user == null) 
            {
                return BadRequest("User not found");
            }

            var internalUser  = _userRepository.GetUserByEmail(user.Email);

            if(internalUser.RefreshToken != _refreshToken) 
            {
                return BadRequest("Invalid refresh token");
            }

            if(internalUser.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Expired refresh token");
            }

            var newAccessToken = _authManager.CreateToken(principal.Claims.ToList());
            var newRefreshToken = _authManager.GenerateRefreshToken();

            internalUser.RefreshToken = newRefreshToken;
            if (!_userRepository.UpdateUser(internalUser.Id, internalUser))
            {
                return BadRequest("There was an error adding the refresh token to the user");
            }

            return Ok(new
            {
            Token = newAccessToken.Result,
            RefreshToken = newRefreshToken,
            RefreshTokenExpiryTime = internalUser.RefreshTokenExpiryTime, 
            Ud = internalUser.Id    

            });;

        }

        


    }



}

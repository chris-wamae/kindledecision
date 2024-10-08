﻿using Microsoft.AspNetCore.Identity;
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
        private readonly IQueryRepository _queryRepository;
        private readonly IUserQueryRepository _userQueryRepository;
        public AccountController(
            UserManager<ApplicationUser> userManager,
            ILogger<AccountController> logger,
            IMapper mapper,
            IAuthManager authManager,
            IUserRepository userRepository,
            IConfiguration configuration,
            IQueryRepository queryRepository,
            IUserQueryRepository userQueryRepository
        )
        {
            _userManager = userManager;
            _logger = logger;
            _mapper = mapper;
            _authManager = authManager;
            _userRepository = userRepository;
            _configuration = configuration;
            _queryRepository = queryRepository;
            _userQueryRepository = userQueryRepository;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            _logger.LogInformation($"Registration attempt for {userDto.Email}");

            userDto.Roles = new string[] {"user"};

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {   
                var user = _mapper.Map<ApplicationUser>(userDto);
                var internalUser = _mapper.Map<User>(userDto);

                user.UserName = userDto.Email;

                internalUser.RefreshToken = "";

                internalUser = _userRepository.CreateUser(internalUser);

                if (internalUser == null)
                {
                    ModelState.AddModelError(
                        "",
                        "Something went wrong while creating the new User"
                    );

                    return StatusCode(500, ModelState);
                }

                user.UserId = internalUser.Id;
                user.Email = userDto.Email;

                var result = await _userManager.CreateAsync(user, userDto.Password);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
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

                return Problem($"Something went wrong in the {nameof(Register)}", statusCode: 500);
            }
        }

        [Authorize]
        [HttpPost("update-user-email")]
        public async Task<IActionResult> UpdateUser(UpdateUser updateUser)
        {
            var internalUser = _userRepository.GetUser(updateUser.Id);

            if (internalUser == null)
            {
                return BadRequest("User not Found");
            }

            var previousEmail = internalUser.Email;

            

            var user = await _userManager.FindByEmailAsync(internalUser.Email);

            

            if (user == null)
            {
                return BadRequest("Asp user not found");
            }

            var validPwd = await _userManager.CheckPasswordAsync(user, updateUser.Password);

            if (!validPwd)
            {
                return Unauthorized("Invalid password");
            }

            var token = await _userManager.GenerateChangeEmailTokenAsync(user, updateUser.Email);

            if (token == null)
            {
                return StatusCode(500, "An error occured generating email change token");
            }

            internalUser.Email = updateUser.Email;

            if (!_userRepository.UpdateUser(internalUser.Id, internalUser))
            {
                return StatusCode(500, "There was a problem updating the internal user");
            }

            user.UserName = updateUser.Email;

            var result = await _userManager.ChangeEmailAsync(
                user,
                updateUser.Email,
                token.ToString()
            );

            if (!result.Succeeded)
            {
                internalUser.Email = previousEmail;

                _userRepository.UpdateUser(internalUser.Id, internalUser);

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }            

            return Accepted();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto userDto)
        {
            _logger.LogInformation($"Login attempt for {userDto.Email}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (!await _authManager.ValidateUser(userDto))
                {
                    return Unauthorized();
                }
                var user = await _userManager.FindByEmailAsync(userDto.Email);

                var internalUser = _userRepository.GetUser(user.UserId);

                if (internalUser == null)
                {
                    ModelState.AddModelError(
                        "",
                        $"Something went wrong while retrieving the user with Id: {user.UserId}"
                    );

                    return StatusCode(500, ModelState);
                }

                if(internalUser.RefreshToken == "banned")
                {
                    return Unauthorized();
                }
                //else
                //{
                //    HttpContext.Session.SetInt32("userId", user.UserId);
                //}

                var refreshToken = _authManager.GenerateRefreshToken();
                var jwtSettings = _configuration.GetSection("Jwt");

                var refreshTokenExpiry = DateTime.Now.AddDays(
                    Convert.ToDouble(jwtSettings.GetSection("refreshTokenDays").Value)
                );

                internalUser.RefreshToken = refreshToken;
                internalUser.RefreshTokenExpiryTime = refreshTokenExpiry;

                if (!_userRepository.UpdateUser(internalUser.Id, internalUser))
                {
                    ModelState.AddModelError("", "Error adding refresh token to the internal User");
                    return StatusCode(500, ModelState);
                }
                ;

                return Accepted(
                    new
                    {
                        Token = await _authManager.CreateToken(),
                        RefreshToken = refreshToken,
                        RefreshTokenExpiry = refreshTokenExpiry,
                        Ud = internalUser.Id
                    }
                );
            }
            catch (Exception ex)
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ;
            var user = _userRepository.GetUser(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Accepted(new { Visibility = user.UserVisibility, ViewMode = user.Viewmode, });
            ;
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken(Tokens tokenObject)
        {
            if (tokenObject.accessToken == null || tokenObject.refreshToken == null)
            {
                return BadRequest("Invalid data provided");
            }

            string? _accessToken = tokenObject.accessToken;
            string? _refreshToken = tokenObject.refreshToken;

            var principal = _authManager.GetPrincipalFromExpiredToken(_accessToken);

            if (principal == null)
            {
                return BadRequest("Invalid access token");
            }

            string username = principal.Identity.Name;

            var user = await _userManager.FindByEmailAsync(username);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            var internalUser = _userRepository.GetUserByEmail(user.Email);

            if (internalUser.RefreshToken != _refreshToken)
            {
                return BadRequest("Invalid refresh token");
            }

            if (internalUser.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Expired refresh token");
            }

            var newAccessToken = _authManager.CreateToken(principal.Claims.ToList());
            var newRefreshToken = _authManager.GenerateRefreshToken();

            internalUser.RefreshToken = newRefreshToken;
            if (!_userRepository.UpdateUser(internalUser.Id, internalUser))
            {
                return BadRequest("There was an error adding the refresh token to the internal User");
            }

            return Ok(
                new
                {
                    Token = newAccessToken.Result,
                    RefreshToken = newRefreshToken,
                    RefreshTokenExpiryTime = internalUser.RefreshTokenExpiryTime,
                    Ud = internalUser.Id
                }
            );
            ;
        }

        [Authorize(Roles = "Administrator,SuperAdmin")]
        [HttpPost("admin-ban-user/{userEmail}")]
        public IActionResult BanUser(string userEmail)
        {
            var user = _userRepository.GetUserByEmail(userEmail);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.RefreshToken = "banned";

            if (!_userRepository.UpdateUser(user.Id, user))
            {
                return BadRequest("Something went wrong updating the user refresh token");
            }

            return Ok();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost("admin-add-role-to-user")]

        public async Task<IActionResult> AddUserToRole(AddUserToRole addUserToRole)
        {

            var user = await _userManager.FindByEmailAsync(addUserToRole.UserEmail);

            if (user == null)
            {
                return BadRequest("Asp user not found");
            }

            var result = await _userManager.AddToRoleAsync(user, addUserToRole.Role);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            return Accepted();

        }


        [Authorize]
        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount([FromBody] LoginUserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (!await _authManager.ValidateUser(userDto))
            {
                return Unauthorized(userDto);
            }



            var aspUser = await _userManager.FindByEmailAsync(userDto.Email);

            if (aspUser == null)
            {
                return BadRequest("Asp user could not be found");
            }

            var internalUser = _userRepository.GetUserByEmail(userDto.Email);

            if (internalUser == null)
            {
                return BadRequest("Internal user could not be found");
            }

            var result = await _userManager.DeleteAsync(aspUser);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            if(!_queryRepository.DeleteUsersCreatedQueries(internalUser.Id))
            {
                _logger.LogError("Asp Net User was deleted successfully but an error occurred deleting the Users Queries");
            };

            if(!_userQueryRepository.DeleteUserQueriesByUser(internalUser.Id))
            {
                _logger.LogError("Asp Net User was deleted successfully but an error occurred deleting the Users UserQueries");
            };

            if (!_userRepository.DeleteUser(internalUser))
            {
                _logger.LogError("Asp Net User was deleted successfully but an error occurred deleting the internal User");

                return StatusCode(500, "Something went wrong while deleting the internal user");
            }

            return NoContent();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("admin-delete-account/{userEmail}")]
        public async Task<IActionResult> AdminDeleteAccount(string userEmail)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var aspUser = await _userManager.FindByEmailAsync(userEmail);

            var internalUser = _userRepository.GetUserByEmail(userEmail);

            if (internalUser == null)
            {
                return BadRequest("Internal user could not be found");
            }

            var result = await _userManager.DeleteAsync(aspUser);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }

            if (!_queryRepository.DeleteUsersCreatedQueries(internalUser.Id))
            {
                _logger.LogError("Asp Net User was deleted successfully but an error occurred deleting the Users Queries");
            };

            if (!_userQueryRepository.DeleteUserQueriesByUser(internalUser.Id))
            {
                _logger.LogError("Asp Net User was deleted successfully but an error occurred deleting the Users UserQueries");
            };

            if (!_userRepository.DeleteUser(internalUser))
            {
                _logger.LogError("Asp Net User was deleted successfully but an error occurred deleting the internal User");

                return StatusCode(500, "Something went wrong while deleting the internal user");
            }

            return NoContent();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("get-all-users")]

         public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetUsers();
            
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(users);
        }
    }
}

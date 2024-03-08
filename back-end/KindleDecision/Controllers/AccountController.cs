﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using KindleDecision.Data;
using AutoMapper;
using KindleDecision.Dto;
using KindleDecision.Services;

namespace KindleDecision.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
    private readonly UserManager<ApiUser> _userManager;
    private readonly ILogger<AccountController> _logger;
    private readonly IMapper _mapper;
    private readonly IAuthManager _authManager;


    public AccountController(UserManager<ApiUser> userManager, ILogger<AccountController> logger, IMapper mapper, IAuthManager authManager)
        {
            _userManager = userManager;
            _logger = logger;
            _mapper = mapper;
            _authManager = authManager;
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
                var user = _mapper.Map<ApiUser>(userDto);
                user.UserName = userDto.Email;
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
             
                _logger.LogError(ex, $"Soemthing went wrong in the {nameof(Register)}");

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
             return BadRequest(ModelState);;
            }

            try
            {
             if(!await _authManager.ValidateUser(userDto))
                {
                 return Unauthorized();
                }

                return Accepted(new { Token = await _authManager.CreateToken() });
            }


            catch(Exception ex) 
            {
                _logger.LogError(ex, $"Something went wrong in the {nameof(Login)}");
                return Problem($"Something went wrong in the{nameof(Login)}", statusCode: 500);
            }
        }

    }



}
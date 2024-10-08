﻿using KindleDecision.Data;
using KindleDecision.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using KindleDecision.Models;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;

namespace KindleDecision.Services
{
    public class AuthManager : IAuthManager
    {
       private readonly UserManager<ApplicationUser> _userManager;
       private readonly IConfiguration _configuration;
       private ApplicationUser _user;

       public AuthManager(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;

        }

       async Task<bool> IAuthManager.ValidateUser(LoginUserDto userDto)
        {
            _user = await _userManager.FindByNameAsync(userDto.Email);
            return (_user != null && await _userManager.CheckPasswordAsync(_user, userDto.Password));
        }

         async Task<string> IAuthManager.CreateToken()
        {
            var signInCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var tokenOptions = GenerateTokenOptions(signInCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        async Task<string> IAuthManager.CreateToken(List<Claim> authClaims)
        {
            var signInCredentials = GetSigningCredentials();
            var claims = authClaims;
            var tokenOptions = GenerateTokenOptions(signInCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }


        private SigningCredentials GetSigningCredentials()
        {

            //ConfigurationBuilder configurationBuilder = new ConfigurationBuilder();

            //IConfiguration configuration = configurationBuilder.AddUserSecrets<AuthManager>().Build();

            var key = _configuration["KEY"];

            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>() { new Claim(ClaimTypes.Name, _user.UserName)};

            var roles = await _userManager.GetRolesAsync(_user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var expirationTime = DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("accessTokenMinutes").Value));

            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetSection("validIssuer").Value,
                claims: claims,
                expires: expirationTime,
                signingCredentials: signingCredentials
                );
            return token;

        }


         string IAuthManager.GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        ClaimsPrincipal? IAuthManager.GetPrincipalFromExpiredToken(string? token)
        {   
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["KEY"])),
                ValidateLifetime = false

            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

   



    }
}

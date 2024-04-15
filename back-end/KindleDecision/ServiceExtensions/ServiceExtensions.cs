using Microsoft.AspNetCore.Identity;
using KindleDecision.Data;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using KindleDecision.Models;
using KindleDecision.Services;

namespace KindleDecision.ServiceExtentions
{
    public static class ServiceExtensions
    {
         
     public static void ConfigureIdentity(this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<ApplicationUser>(q => q.User.RequireUniqueEmail = true);

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), services);

            builder.AddEntityFrameworkStores<DataContext>().AddDefaultTokenProviders();
        }   
        
    public static void ConfigureJWT(this IServiceCollection services, IConfiguration configuration) 
        {

            var jwtSettings = configuration.GetSection("Jwt");
            var key = configuration["KEY"];

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {  
                o.TokenValidationParameters = new TokenValidationParameters
                {   
                    ValidateAudience = false,
                    ValidateIssuer = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                };
            });
        }

    }
}

using Microsoft.AspNetCore.Identity;
using KindleDecision.Data;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace KindleDecision.ServiceExtentions
{
    public static class ServiceExtensions
    {
     public static void ConfigureIdentity(this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<ApiUser>(q => q.User.RequireUniqueEmail = true);

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), services);

            builder.AddEntityFrameworkStores<DataContext>().AddDefaultTokenProviders();
        }     

    }
}

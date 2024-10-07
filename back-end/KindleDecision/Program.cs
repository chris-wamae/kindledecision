using KindleDecision;
using KindleDecision.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;
using KindleDecision.Repositories;
using KindleDecision.Interfaces;
<<<<<<< HEAD

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
=======
using KindleDecision.ServiceExtentions;
using KindleDecision.Services;
using Microsoft.Extensions.Configuration;


var builder = WebApplication.CreateBuilder(args);

//Add services to the container.

//builder.Services.AddDistributedMemoryCache();

//builder.Services.AddSession(o =>
//{
// o.IdleTimeout = TimeSpan.FromHours(24);

//o.Cookie.HttpOnly = false;

//    o.Cookie.SameSite = SameSiteMode.None;

//    o.Cookie.SecurePolicy = CookieSecurePolicy.None;    
//});
builder.Services.AddCors(o =>
{
    o.AddPolicy(name: "AllowAll",
        policy => {
            policy.AllowAnyOrigin();
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            }
        );
    
});
builder.Services.AddControllers();
builder.Services.AddAuthentication();
builder.Services.ConfigureIdentity();
builder.Services.ConfigureJWT(builder.Configuration);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
builder.Services.AddTransient<Seed>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services
    .AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddScoped<IQueryRepository, QueryRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ISelectionRepository, SelectionRepository>();
builder.Services.AddScoped<IChoiceRepository, ChoiceRepository>();
<<<<<<< HEAD
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
=======
builder.Services.AddScoped<IUserSelectedInQueryRepository, UserSelectedInQueryRepository>();
builder.Services.AddScoped<IUserQueryRepository, UserQueryRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
AddSwaggerDoc(builder.Services);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

<<<<<<< HEAD
var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);
=======
builder.Services.AddScoped<IAuthManager, AuthManager>();

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(o =>
{
    o.IdleTimeout = TimeSpan.FromMinutes(20);
o.Cookie.IsEssential = true;

});

var app = builder.Build();

SeedData(app);
>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<Seed>();
        service.SeedDataContext();
    }
}

<<<<<<< HEAD
=======
void AddSwaggerDoc(IServiceCollection services)
{
    builder.Services.AddSwaggerGen(c =>
    {
        c.AddSecurityDefinition(
            "Bearer",
            new OpenApiSecurityScheme
            {
                Description =
                    @"JWT Authorization header using the Bearer scheme.
                          Enter 'Bearer' [space] and then your token in the text input below.
                          Example: 'Bearer 12345abcdef' ",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            }
        );

        c.AddSecurityRequirement(
            new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "0auth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                }
            }
        );

        c.SwaggerDoc(
            "v1",
            new Microsoft.OpenApi.Models.OpenApiInfo { Title = "HotelListing", Version = "v1" }
        );
    });
}

>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

<<<<<<< HEAD
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
=======


app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseCookiePolicy();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseSession();

app.UseEndpoints(endpoints =>
{

    endpoints.MapControllers();

});

app.Run();



>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d

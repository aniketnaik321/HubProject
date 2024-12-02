
// Add services to the container.
using ApiHub.API.Hubs;
using ApiHub.API.Middleware;
using ApiHub.Domain.Models;
using ApiHub.Service;
using ApiHub.Service.Hubs;
using ApiHub.Service.MappingProfiles;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;
using ILogger = Serilog.ILogger;

var builder = WebApplication.CreateBuilder(args);

//Authentication
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Jwt:Key"))),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };



    x.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            // Check if the request path is for SignalR
            var path = context.HttpContext.Request.Path;

            // Only add token if the request is for the SignalR Hub (e.g., /chathub)
            if (path.StartsWithSegments("/chathub"))
            {
                // Look for the token in the Authorization header
                var authHeader = context.HttpContext.Request.Headers["Authorization"].ToString();
                if (authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    context.Token = authHeader.Substring("Bearer ".Length).Trim();
                }
            }

            return Task.CompletedTask;
        }
    };

});

builder.Services.AddControllers();

//Swagger
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "ProjectMonitor.API", Version = "v1" });
    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

//Database
builder.Services.AddDbContext<HrliteDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("HRLiteDB"));
});

//Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
            builder =>
            {
                builder.WithOrigins("http://localhost:4200", "http://localhost:8100", "https://localhost") // Replace with your client's URL
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials();
            });
});

//SignalR Chat

builder.Services.AddSignalR();

//Service Registrations
builder.Services.RegisterServices(builder.Configuration);

//Automapper registration
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfiles>(),
                            AppDomain.CurrentDomain.GetAssemblies());

// Initialize Serilog logger with the configuration
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
.CreateLogger();


builder.Services.AddSingleton(typeof(ILogger), Log.Logger);

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("firebase_account.json"),
});


builder.Services.AddSingleton<
    IAuthorizationMiddlewareResultHandler, DefaultAuthorizationMiddlewareResultHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");

app.UseRouting();
app.MapHub<ChatHub>("/chathub");
app.MapHub<NotificationServiceHub>("/notificationservicehub");
app.UseAuthorization();

//app.UseMiddleware<AuthorizationMiddleware>();

app.UseAuthentication();

app.MapControllers();


app.Run();
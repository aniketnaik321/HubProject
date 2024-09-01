using ApiHub.Domain.Models;
using ApiHub.Service;
using ApiHub.Service.MappingProfiles;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Serilog;
using ILogger = Serilog.ILogger;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<HrliteDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("HRLiteDB"));
});

// Add Hangfire services
builder.Services.AddHangfire(configuration => configuration
        .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
        .UseSimpleAssemblyNameTypeSerializer()
.UseRecommendedSerializerSettings()
        .UseSqlServerStorage(builder.Configuration.GetConnectionString("HangfireConnection")));

// Add the processing server as IHostedService
builder.Services.AddHangfireServer();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("*")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});


// Add services to the container.

builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfiles>(),
                            AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.RegisterServices(builder.Configuration);

// Initialize Serilog logger with the configuration
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
.CreateLogger();


builder.Services.AddSingleton(typeof(ILogger), Log.Logger);

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("firebase_account.json"),
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseHangfireDashboard();


app.MapControllers();

app.Run();

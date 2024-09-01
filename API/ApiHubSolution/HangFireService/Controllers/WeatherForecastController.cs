using ApiHub.Service.Services.Contracts;
using Hangfire;
using Microsoft.AspNetCore.Mvc;

namespace HangFireService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ITaskService _taskService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ITaskService taskService)
        {
            _logger = logger;
            _taskService = taskService;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            RecurringJob.AddOrUpdate(
                   "Task Timer Job",  // A unique identifier for this job
                   () => _taskService.MoveTaskToInProgress(),  // The method to run
                   "*/15 * * * *"      // Cron expression for every 15 minutes
               );

    //        BackgroundJob.Schedule(
    //() => _taskService.MoveTaskToInProgress(),
    //TimeSpan.FromSeconds(80));
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
using ApiHub.Domain.Models;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Services.Contracts;
using ApiHub.Service.Services.Implementations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProjectController : BaseApiController
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService) { 
            this._projectService = projectService;
        }

        [HttpPost("ProjectList")]
        public async Task<IActionResult> Get(DtoPageRequest input)
        {
            return Ok(await this._projectService.GetList(input));
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await this._projectService.Get(Guid.Parse(id)));
        }

        [HttpGet("Lookup")]
        public async Task<IActionResult> GetLookup()
        {
            return Ok(await this._projectService.GetLookups());
        }

        // POST api/<ProjectController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoProject project)
        {
            project.CreatedBy=Guid.Parse(GetUserId());
            return PreparePostResponse(await _projectService.Create(project));
        }

        // PUT api/<ProjectController>/5
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] DtoProject project)
        {
            return PreparePostResponse(await _projectService.Update(project, project.Id));
        }

        [HttpDelete("{projectId}")]
        public async Task<IActionResult> Delete(string projectId)
        {
            var userId = this.GetUserId(); // Assuming GetUserId() is an extension method or provided by a base controller class
            var result = await _projectService.Remove(projectId, userId);

            // Assuming PreparePostResponse is a method that prepares the response based on the result from _taskService.Remove()
            return PreparePostResponse(result);
        }
    }
}

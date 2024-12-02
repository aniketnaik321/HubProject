using ApiHub.Service.DTO.Common;
using ApiHub.Service.DTO;
using ApiHub.Service.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ApiHub.Service.DTO.Cattle;

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CattleController : BaseApiController
    {


        private readonly ICattleService _cattleService;

        public CattleController(ICattleService cattleService)
        {
            this._cattleService = cattleService;
        }

        [HttpPost("ProjectList")]
        public async Task<IActionResult> Get(DtoPageRequest input)
        {
            return Ok(await this._cattleService.GetList(input));
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await this._cattleService.Get(Guid.Parse(id)));
        }

        [HttpGet("Lookup")]
        public async Task<IActionResult> GetLookup()
        {
            return Ok(await this._cattleService.GetLookups());
        }

        // POST api/<ProjectController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoCattle cattle)
        {
           // project.CreatedBy = Guid.Parse(GetUserId());
            return PreparePostResponse(await _cattleService.Create(cattle));
        }

        // PUT api/<ProjectController>/5
        [HttpPut] //changed to post temporary, as getting "Method not allowed exception"
        public async Task<IActionResult> Put([FromBody] DtoCattle input)
        {
            return PreparePostResponse(await _cattleService.Update(input, input.id));
        }

        [HttpDelete("{projectId}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userId = this.GetUserId(); // Assuming GetUserId() is an extension method or provided by a base controller class
            var result = await _cattleService.Remove(id, userId);

            // Assuming PreparePostResponse is a method that prepares the response based on the result from _taskService.Remove()
            return PreparePostResponse(result);
        }

        // GET api/<ProjectController>/5
        [HttpGet("projectMembers/{id}")]
        public async Task<IActionResult> GetProjectMembers(string id)
        {
            return Ok(await this._cattleService.GetProjectMembers(id));
        }

        [HttpPost("AddProjectMember")]
        public async Task<IActionResult> AddProjectMember(DtoAddProjectMember input)
        {
            var result = await this._cattleService.AddProjectMember(input);
            // Assuming PreparePostResponse is a method that prepares the response based on the result from _taskService.Remove()
            return PreparePostResponse(result);
        }


    }

}

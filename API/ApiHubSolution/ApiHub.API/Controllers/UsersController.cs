using ApiHub.Service.DTO;
using ApiHub.Service.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : BaseApiController
    {

        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }



        // GET: api/<ProjectController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProjectController>
        [HttpPost]
        public void Post([FromBody] DtoProject project)
        {

        }

        [HttpPost("UpdateUserStatus")]
        public async Task<IActionResult> UpdateUserStatus([FromBody] DtoUpdateUserStatus input)
        {
            return  PreparePostResponse(await  _userService.UpdateUserStatus(input));
        }

        [HttpPost("UpdateDeviceToken")]
        public async Task<IActionResult> UpdateDeviceToken([FromBody] DtoUserDeviceToken input)
        {
            return PreparePostResponse(await _userService.UpdateDeivceToken(input));
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            
        }
    }
}

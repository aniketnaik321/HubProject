using ApiHub.Domain.Models;
using ApiHub.Service.DTO;
using ApiHub.Service.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : BaseApiController
    {
        private readonly IUserChatService _userChatService;


        public ChatController(IUserChatService userChatService)
        {
            _userChatService = userChatService;
        }

        // GET: api/<ChatController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ChatController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        [HttpGet("GetChatList")]
        public async Task<IActionResult> GetChatList()
        {
            var id = this.GetUserId();
            return Ok(await _userChatService.GetChatList(new DtoChatListRequest()
            {
                UserId = id
            }));
        }

        [HttpGet("LoadUserMessages/{id}")]
        public async Task<IActionResult> LoadUserMessages(string id)
        {
            return Ok(await _userChatService.LoadUserMessages(new DtoLoadMessagesRequest()
            {
                SenderUserId = Guid.Parse(this.GetUserId()),
                ReceiverUserId=Guid.Parse(id)
            }));
            
        }


        // POST api/<ChatController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoAddChatMessage value)
        {
            var userId = this.GetUserId(); // Assuming GetUserId() is an extension method or provided by a base controller class
            var result = await _userChatService.AddChatMessage(value);

            // Assuming PreparePostResponse is a method that prepares the response based on the result from _taskService.Remove()
            return PreparePostResponse(result);

        }

        // PUT api/<ChatController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ChatController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

using ApiHub.Service.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpController : BaseApiController
    {
        private readonly IHelpAndSupportService _helpAndSupportService;

        public HelpController(IHelpAndSupportService helpAndSupportService)
        {
            _helpAndSupportService = helpAndSupportService;
        }

        [HttpGet("FaqList")]
        public async Task<IActionResult> GetLookup()
        {
            return Ok(await this._helpAndSupportService.GetFaqList());
        }
    }
}

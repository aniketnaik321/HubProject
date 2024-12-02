using ApiHub.Domain.Models;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Services.Contracts;
using ApiHub.Service.Services.Implementations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QRCoder;
using System.Drawing;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class RestaurantOrderController : BaseApiController
    {
      
       private readonly IRestaurantService _restaurantService;

        public RestaurantOrderController(IRestaurantService restaurantService) {

            this._restaurantService = restaurantService;
        }

        

        [HttpGet("Lookup")]
        public async Task<IActionResult> GetLookup()
        {
            return Ok(await this._restaurantService.GetLookups());
        }


        [HttpGet("GetMenus/{restaurantId}")]
        public async Task<IActionResult> GetMenus(string restaurantId)
        {
            return Ok(await this._restaurantService.GetRestaurantMenuAsync(Guid.Parse(restaurantId)));
        }


        [HttpGet("GetQRCode/{id}")]
        public IActionResult GetQRCode(string id)
        {
            // Define the URL with the given id
            string url = $"https://app.globalsoftsuite.xyz/restaurant/splash?mid=xyzw&tablid=645";

            // Create QR code
            using (var qrGenerator = new QRCodeGenerator())
            {
                using (var qrCodeData = qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q))
                {

                    using (PngByteQRCode qrCode = new PngByteQRCode(qrCodeData))
                    {
                        byte[] qrCodeImage = qrCode.GetGraphic(20);
                       
                        return File(qrCodeImage, "image/png"); // Return the QR code as an image
                    }

                }
            }
        }


        // POST api/<ProjectController>

    }
}

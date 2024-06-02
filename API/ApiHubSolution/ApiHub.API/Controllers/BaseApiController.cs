using ApiHub.Service.DTO.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace ApiHub.API.Controllers
{
   
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected IActionResult PreparePostResponse(DtoCommonReponse response)
        {
            IActionResult result=Ok();
            switch (response.StatusCode)
            {
                case System.Net.HttpStatusCode.OK:
                    result = Ok(response);
                    break;                   
                case System.Net.HttpStatusCode.Unauthorized:
                    result = Unauthorized(response);
                    break;
                case System.Net.HttpStatusCode.BadRequest:
                    result = BadRequest(response);
                    break;
            }
            return result;
        }


        protected string GetUserId()
        {
            // Get the JWT token from the request header
            string token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
            {
                // Handle the case where no token is provided
                return null;
            }

            try
            {
                // Remove "Bearer " from the beginning of the token
                token = token.Replace("Bearer ", string.Empty);

                // Decode the JWT token
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                // Extract the user ID from the decoded token
                string data = jwtToken?.Claims?.FirstOrDefault(c => c.Type == "nameid")?.Value;

                return data;
            }
            catch (SecurityTokenExpiredException)
            {
                // Handle the case where the token has expired
                return null;
            }
            catch (Exception)
            {
                // Handle other token validation errors
                return null;
            }
        }

    }
}

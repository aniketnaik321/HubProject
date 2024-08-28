using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Helpers;
using ApiHub.Service.Services.Contracts;
using ApiHub.Service.Services.Implementations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using static ApiHub.Service.Constants.AppConstants;
using IAuthorizationService = ApiHub.Service.Services.Contracts.IAuthorizationService;

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseApiController
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IUserService _usersService;
        private readonly IDbService _dbService;

        public AccountController(IAuthorizationService authorizationService, IUserService userService, IDbService dbService)
        {
            this._authorizationService = authorizationService;
            this._usersService = userService;
            _dbService = dbService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] DtoLogin userObj)
        {
            var profileObject = await _authorizationService.CreateJwt(userObj);
            //var newAccessToken = user.Token;
            //var newRefreshToken = CreateRefreshToken();
            //user.RefreshToken = newRefreshToken;
            //user.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
            return Ok(profileObject);
        }


        [HttpPost("User")]
        public async Task<IActionResult> GetUserWithSearchFilter(DtoPageRequest request)
        {
            return Ok(await _usersService.GetUserList(request));
        }


       

        [HttpGet("lookup/{id}")]
        public async Task<IActionResult> GetLookup(long id)
        {
            return Ok(await _usersService.GetLookups());
        }
      
        
        [HttpPost("register")]
        public async Task<IActionResult> AddUser([FromBody] DtoRegisterUserModel data)
        {
            if (data == null)
                return BadRequest();
            
            data.Password = PasswordHasher.GeneratePassword();
            data.PasswordPlainText = data.Password;
           // var passMessage = PasswordHasher.CheckPasswordStrength(data.Password!);
          //  if (!string.IsNullOrEmpty(passMessage))
             //   return BadRequest(new { Message = passMessage.ToString() });

            data.Password = PasswordHasher.HashPassword(data.Password!);
            return PreparePostResponse(await _authorizationService.CreateUser(data))!;

        }

        [HttpPost("SendPasswordResetRequest")]
        public async Task<IActionResult> ResetPasswordRequest(DtoPasswordResetRequestModel input)
        {
            return Ok(await _dbService.CallProcedure<DtoPasswordResetRequestModel>(input, AppConstants.PROC_PASSWORD_RESET_REQUEST));
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(DtoPasswordResetModel input)
        {

            if ((input.NewPassword != input.ConfirmPassword))
            {
                return BadRequest(new DtoCommonReponse { StatusCode = HttpStatusCode.BadRequest, Message = "New password and confirm password cannot be same" });
            }

            var passMessage = PasswordHasher.CheckPasswordStrength(input.NewPassword!);
            if (!string.IsNullOrEmpty(passMessage))
                return BadRequest(new DtoCommonReponse { StatusCode = HttpStatusCode.BadRequest, Message = passMessage.ToString() });

            input.NewPassword = PasswordHasher.HashPassword(input.NewPassword!);
            return PreparePostResponse(await _dbService.CallProcedure<DtoPasswordResetModel>(input, AppConstants.PROC_PASSWORD_RESET))!;
        }

        [Authorize]
        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] DtoChangepassword input)
        {
            input.UserId = this.GetUserId();
            return PreparePostResponse(await _authorizationService.ChangePassword(input));
        }

        [Authorize]
        [HttpPost("SendPasswordResetLink/{userId}")]
        public async Task<IActionResult> SendPasswordResetLink([FromRoute] string userId)
        {            
            return PreparePostResponse(await _usersService.SendPasswordResetEmail(userId));
        }
    }



}

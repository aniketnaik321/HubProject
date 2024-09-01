using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Helpers;

using ApiHub.Service.Repository.Contracts;
using ApiHub.Service.Services.Contracts;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ApiHub.Service.Services
{
    [ScopedRegistration]
    public class AuthorizationService : IAuthorizationService
    {
        private readonly IMapper _automapper;
        private IUserRepository _userRepository;
        private IDbService _dbService;
        private readonly IConfiguration _configurationManager;

        public AuthorizationService(IConfiguration configurationManager,
            IMapper mapper,
            IUserRepository userRepository,
            IDbService dbService)
        {
            this._configurationManager = configurationManager;
            _automapper = mapper;
            _dbService = dbService;
            this._userRepository = userRepository;
        }

        public async Task<DtoCommonReponse> CreateJwt(DtoLogin user)
        {
            DtoCommonReponse response = new DtoCommonReponse();
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configurationManager.GetValue<string>("Jwt:Key"));
            var usersObj = await this._userRepository.GetUserByIdAsync(T => T.UserName == user.UserName);

            

            if (usersObj == null || !PasswordHasher.VerifyPassword(user.Password, usersObj.Passwordhash!))
            {
                response.Message = "Invalid username or password";
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                return response;
            }

            if (usersObj.IsActive == false)
            {
                response.Message = "This account has been disabled.";
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                return response;
            }

            ClaimsIdentity identity = new ClaimsIdentity(new Claim[]
            {
                  new Claim(ClaimTypes.Name,$"{user.UserName}"),
                  new Claim(ClaimTypes.NameIdentifier, usersObj.Id.ToString())
            });

            foreach (var item in usersObj.UserRoles)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, item.Role!.RoleTitle!.ToString()));
            }

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };

            var users = _automapper.Map<DtoLoginResponse>(usersObj);
            users.UserId=usersObj.Id.ToString();
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            users.Token = jwtTokenHandler.WriteToken(token);
            response.data = users;
            response.Message = "Success";
            response.StatusCode = System.Net.HttpStatusCode.OK;
            return response;
        }

        private async Task<string> CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = await _userRepository.GetAsync(a => a.RefreshToken == refreshToken);
            if (tokenInUser != null)
            {
                //return CreateRefreshToken();
            }
            return refreshToken;
        }

        public async Task<DtoCommonReponse> CreateUser(DtoRegisterUserModel user)
        {
            user.UserName = user.EmailId;
            user.Id = Guid.NewGuid();
            //var users = _automapper.Map<User>(user);
            //await _userRepository.CreateAsync(users);
            //return new DtoCommonReponse()
            //{
            //    StatusCode = System.Net.HttpStatusCode.OK,
            //    Message = AppConstants.SAVE_SUCCESS
            //};
            return await _dbService.CallProcedure(user, AppConstants.PROC_CREATEUSER);
        }

        public async Task<DtoCommonReponse> ChangePassword(DtoChangepassword input)
        {
            DtoCommonReponse response = new DtoCommonReponse();
            var usersObj = await this._userRepository.GetAsync(T => T.Id==Guid.Parse(input.UserId));


            //Step 1: Check if old password is correct
            if (usersObj == null || !PasswordHasher.VerifyPassword(input.OldPassword!, usersObj.Passwordhash!))
            {
                response.Message = "Invalid username or password";
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                return response;
            }

            //Step 2: Check if new password and confirm password matches.
            if ((input.NewPassword != input.ConfirmPassword))
            {
                return new DtoCommonReponse
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "New password and confirm password does not match."
                };
            }

            //Step 2.5: New password and old password shouldn't be same.

            if ((input.NewPassword == input.OldPassword))
            {
                return new DtoCommonReponse
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Message = "New password and Old password cannot be same."
                };
            }

            //Step 3: Check new password strength

            var passMessage = PasswordHasher.CheckPasswordStrength(input.NewPassword!);
            if(!string.IsNullOrEmpty(passMessage))
            {
                response.Message = passMessage;
                response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                return response;
            }

            //Step 4: All tests passed, update the password.

            input.NewPassword = PasswordHasher.HashPassword(input.NewPassword!);
            return await _dbService.CallProcedure<DtoChangepassword>(input, AppConstants.PROC_UPDATE_PASSWORD);
        }
    }
}

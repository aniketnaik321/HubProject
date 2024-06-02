using ApiHub.Service.Attributes;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Services.Contracts
{
   
    public interface IAuthorizationService
    {
        Task<DtoCommonReponse> CreateJwt(DtoLogin user);
        Task<DtoCommonReponse> CreateUser(DtoRegisterUserModel user);
        Task<DtoCommonReponse> ChangePassword(DtoChangepassword input);
    }
}

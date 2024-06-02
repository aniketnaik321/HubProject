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
   
    public interface IUserService
    {
        public Task<DtoCommonReponse> AddUser(DtoUser input);
        Task<object?> UpdateUser(DtoUser input, long id);
        Task<DtoPagedResponse<DtoUser>> GetUserList(DtoPageRequest request);       
        Task<List<List<DtoLookup>>> GetLookups();
        Task<DtoCommonReponse> UpdateUserStatus(DtoUpdateUserStatus input);
        Task<DtoCommonReponse> UpdateDeivceToken(DtoUserDeviceToken input);
    }
}

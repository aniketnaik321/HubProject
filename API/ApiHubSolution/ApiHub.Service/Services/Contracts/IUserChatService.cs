using ApiHub.Service.Attributes;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ApiHub.Service.DTO.DtoConnectionIdRequest;

namespace ApiHub.Service.Services.Contracts
{
   
    public interface IUserChatService
    {
        public Task<DtoCommonReponse> AddChatMessage(DtoAddChatMessage input);
        public Task<List<DtoChatMessageResponse>> GetChatList(DtoChatListRequest input);

        public Task<DtoChatUserResponse> GetConnectionIdFromUserId(DtoConnectionIdRequest input);


        public Task<List<DtoChatMessageResponse>> LoadUserMessages(DtoLoadMessagesRequest input);

    }
}

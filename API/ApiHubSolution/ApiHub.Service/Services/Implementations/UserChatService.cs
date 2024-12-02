using ApiHub.Service.Attributes;
using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Repository.Contracts;
using ApiHub.Service.Services.Contracts;
using AutoMapper;
using static ApiHub.Service.DTO.DtoConnectionIdRequest;

namespace ApiHub.Service.Services.Implementations
{
    [ScopedRegistration]
    public class UserChatService : IUserChatService
    {
        private readonly IUserRepository _userRepository;
        private readonly IDbService _dbService;

        public UserChatService(            
            IDbService dbService
            )
        {           
            _dbService = dbService;
           
        }

        public async Task<DtoCommonReponse> AddChatMessage(DtoAddChatMessage input)
        {
            return await _dbService.CallProcedure(new DtoAddChatMessage()
            {                
                Message = input.Message,
                ReceiverId  =input.ReceiverId,
                SenderId=input.SenderId
            }, AppConstants.PROC_ADD_CHATMESSAGE);
        }



        public async Task<List<DtoChatMessageResponse>> GetChatList(DtoChatListRequest input)
        {
            return await _dbService.GetListFromProcedure<DtoChatMessageResponse,DtoChatListRequest>(input, AppConstants.PROC_GET_CHATLIST);
        }


        public async Task<List<DtoChatMessageResponse>> LoadUserMessages(DtoLoadMessagesRequest input)
        {
            return await _dbService.GetListFromProcedure<DtoChatMessageResponse, DtoLoadMessagesRequest>(input, AppConstants.PROC_GET_MESSAGES);
        }

        public async Task<DtoChatUserResponse> GetConnectionIdFromUserId(DtoConnectionIdRequest input)
        {
            var result= await _dbService.GetListFromProcedure<DtoChatUserResponse, DtoConnectionIdRequest>(input, 
                AppConstants.PROC_GET_USERFROMCONNECTIONID);
            return result.FirstOrDefault()!;
        }

    }


}
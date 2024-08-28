using ApiHub.Service.Attributes;
using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Repository.Contracts;
using ApiHub.Service.Services.Contracts;
using AutoMapper;


namespace ApiHub.Service.Services.Implementations
{
    [ScopedRegistration]
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _automapper;
        private readonly IDbService _dbService;

        public UserService(
            IUserRepository userRepository,
            IMapper mapper,
            IUserRepository UserRepository,
            IDbService dbService
            )
        {
            _userRepository = userRepository;
            _dbService = dbService;
            _automapper = mapper;
        }

        public async Task<DtoCommonReponse> AddUser(DtoUser input)
        {
            var user = _automapper.Map<Domain.Models.User>(input);
            await _userRepository.CreateAsync(user);
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.SAVE_SUCCESS
            };
        }

        public async Task<object?> UpdateUser(DtoUser input, long id)
        {
            var attribute = _automapper.Map<Domain.Models.User>(input);
            await _userRepository.UpdateAsync(attribute);
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.UPDATE_SUCCESS
            };
        }
        public async Task<object> GetUserList(int pageNumber, int pageSize)
        {
            return await _userRepository.GetPagedDataAsync(pageNumber, pageSize);
        }
        public async Task<object> DeleteUser(long id)
        {
            await _userRepository.DeleteAsync(await _userRepository.GetByIdAsync(id));
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.SAVE_SUCCESS
            };
        }
        public async Task<DtoPagedResponse<DtoUser>> GetUserList(DtoPageRequest request)
        {
            return await _dbService.GetPaginatedResultset<DtoUser>(request, AppConstants.PROC_USERSLIST);
        }

        public async Task<List<List<DtoLookup>>> GetLookups()
        {
            return await _dbService.GetDataLookupResults(AppConstants.LOOKUP_USERS);
        }

        public async Task<DtoUser> GetUserById(long id)
        {
            var result = await _userRepository.GetByIdAsync(id);
            return _automapper.Map<DtoUser>(result);
        }

        public async Task<DtoCommonReponse> UpdateUserStatus(DtoUpdateUserStatus input)
        {
            return await _dbService.CallProcedure(input, Constants.AppConstants.PROC_UPDATE_USER_STATUS);
        }

        public async Task<DtoCommonReponse> UpdateDeivceToken(DtoUserDeviceToken input)
        {
            return await _dbService.CallProcedure<DtoUserDeviceToken>(input,AppConstants.PROC_UPDATE_DEVICE_TOKEN);            
        }

        public async Task<DtoCommonReponse> SendPasswordResetEmail(string userId) {

            var inp = new DtoSendPasswordResetLinkRequest() {
                UserId = Guid.Parse(userId),
            };

            return await _dbService.CallProcedure<DtoSendPasswordResetLinkRequest>(inp, AppConstants.PROC_SEND_PASSWORD_RESET_EMAIL);
        
        }

    }


}
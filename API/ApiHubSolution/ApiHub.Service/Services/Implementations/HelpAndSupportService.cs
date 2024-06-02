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
    public class HelpAndSupportService : IHelpAndSupportService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _automapper;
        private readonly IDbService _dbService;

        public HelpAndSupportService(
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

        public async Task<IEnumerable<DtoFaq>> GetFaqList()
        {
            return await _dbService.CallProcedure<DtoFaq>(AppConstants.PROC_FAQ_LIST);
        }

    }


}
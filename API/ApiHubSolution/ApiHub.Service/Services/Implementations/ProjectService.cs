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
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _automapper;
        private readonly IDbService _dbService;

        public ProjectService(
            IProjectRepository projectRepository,
            IMapper mapper,
            IDbService dbService
            )
        {            
            _projectRepository = projectRepository;
            _dbService = dbService;
            _automapper = mapper;
        }

        public async Task<DtoCommonReponse> Create(DtoProject input)
        {
            input.Id = Guid.NewGuid();
            input.CreatedOn = DateTime.UtcNow;
            var user = _automapper.Map<Domain.Models.Project>(input);
            await _projectRepository.CreateAsync(user);
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.SAVE_SUCCESS
            };
        }

        public async Task<DtoCommonReponse> Update(DtoProject input, object id)
        {
            var project = _automapper.Map<Domain.Models.Project>(input);
            await _projectRepository.UpdateAsync(project);
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.UPDATE_SUCCESS
            };
        }
       
        public async Task<DtoCommonReponse> Remove(object id, string userdId)
        {
            DtoDeleteRequest req = new DtoDeleteRequest()
            {
                Entity = "Project",
                Key = Convert.ToString(id)!,
                UserId = userdId
            };
            return await _dbService.CallProcedure(req, AppConstants.PROC_SOFTDELETE);
        }
        public async Task<DtoPagedResponse<DtoProject>> GetList(DtoPageRequest request)
        {
            return await _dbService.GetPaginatedResultset<DtoProject>(request, AppConstants.PROC_GETPROJECTS);
        }

        public async Task<DtoProject> Get(object id)
        {          
            return  _automapper.Map<DtoProject>(await _projectRepository.GetByIdAsync(id));
        }

        public async Task<List<List<DtoLookup>>> GetLookups()
        {
            return await _dbService.GetDataLookupResults(AppConstants.LOOKUP_PROJECTS);
        }
    }
}
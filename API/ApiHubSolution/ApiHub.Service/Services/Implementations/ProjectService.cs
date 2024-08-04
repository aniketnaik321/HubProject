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

            foreach (var item in input.UsersList ?? Array.Empty<string>())
            {
               await _dbService.CallProcedure(new DtoAddProjectMember()
                {
                    ProjectId = input.Id.Value,
                    UserId = Guid.Parse(item)
                }, AppConstants.PROC_ADD_PROJECT_MEMBERS);
            }
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
            foreach (var item in input.UsersList ?? Array.Empty<string>())
            {
                await _dbService.CallProcedure(new DtoAddProjectMember()
                {
                    ProjectId = input.Id.Value,
                    UserId = Guid.Parse(item)
                }, AppConstants.PROC_ADD_PROJECT_MEMBERS);
            }

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
            var members = await this.GetProjectMembers(id.ToString());
            var result= _automapper.Map<DtoProject>(await _projectRepository.GetByIdAsync(id));

            result.UsersList = members.Select(T => T.UserId.ToString().ToUpper()).ToArray();

            return result;
        }

        public async Task<List<List<DtoLookup>>> GetLookups()
        {
            return await _dbService.GetDataLookupResults(AppConstants.LOOKUP_PROJECTS);
        }

        public async Task<List<DtoProjectMembers>> GetProjectMembers(string projectId)
        {
            return await _dbService.GetListFromProcedure<DtoProjectMembers, DtoProjectMemberRequest>(new DtoProjectMemberRequest()
            {
                ProjectId = Guid.Parse(projectId)
            }, AppConstants.PROC_GET_PROJECT_MEMBERS); ;
        }

        public async Task<DtoCommonReponse> AddProjectMember(DtoAddProjectMember input)
        {
            return await _dbService.CallProcedure(new DtoAddProjectMember()
            {
                ProjectId = input.ProjectId,
                UserId=input.UserId
            }, AppConstants.PROC_ADD_PROJECT_MEMBERS);
        }

    }
}
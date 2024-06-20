using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Repository.Contracts;
using ApiHub.Service.Services.Contracts;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApiHub.Service.Services.Implementations
{
    [ScopedRegistration]
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _automapper;
        private readonly IDbService _dbService;
        private readonly IPushNotificationService _pushNotificationService;

        public TaskService(
            ITaskRepository taskRepository,
            IMapper mapper,
            IDbService dbService,
            ICommentRepository commentRepository,
            IProjectRepository projectRepository,
            IPushNotificationService pushNotificationService
            )
        {            
            _taskRepository = taskRepository;
            _dbService = dbService;
            _automapper = mapper;
            _commentRepository = commentRepository;
            _projectRepository = projectRepository;
            _pushNotificationService = pushNotificationService;
        }

        public async Task<DtoCommonReponse> Create(DtoIssues input)
        {           
            input.CreatedDate = DateTime.UtcNow;
            var data = _automapper.Map<Domain.Models.Issue>(input);
            var project = await _projectRepository.GetByIdAsync(input.ProjectId!);
            data.IssueKey = project.ProjectTaskPrefix;
            await _taskRepository.CreateAsync(data);
            
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.SAVE_SUCCESS
            };
        }

        public async Task<DtoCommonReponse> Update(DtoIssues input, object id)
        {
            var data = _automapper.Map<Domain.Models.Issue>(input);
            await _taskRepository.UpdateAsync(data);
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.UPDATE_SUCCESS
            };
        }
       
        public async Task<DtoCommonReponse> Remove(object taskId, string userdId)
        {
            DtoDeleteRequest req = new DtoDeleteRequest()
            {
                Entity = "Issues",
                Key = Convert.ToString(taskId)!,
                UserId = userdId
            };

         return   await _dbService.CallProcedure(req, AppConstants.PROC_SOFTDELETE);
            
        }
        public async Task<DtoPagedResponse<DtoIssues>> GetList(DtoPageRequest request)
        {
            return await _dbService.GetPaginatedResultset<DtoIssues>(request, AppConstants.PROC_GETTASKS);
        }
        public async Task<DtoIssues> Get(object id)
        {          
            return  _automapper.Map<DtoIssues>(await _taskRepository.GetByIdAsync(id));
        }
        public async Task<List<List<DtoLookup>>> GetLookups()
        {
            return await _dbService.GetDataLookupResults(AppConstants.LOOKUP_ISSUES);
        }
        public async Task<DtoCommonReponse> UpdateTaskStatus(DtoStatusUpdateRequest input)
        {
            var result= await _dbService.CallProcedure(input, AppConstants.PROC_UPDATE_STATUS);
            var template = (await this._dbService.GetListFromProcedure<DtoNotificationTemplateResponse, DtoNotificationTemplateRequest>(new DtoNotificationTemplateRequest()
            {
                TemplateCode = AppConstants.T_TASK_MOVED
            }, Constants.AppConstants.PROC_GET_NOTIFICATION_TEMPLATE)).FirstOrDefault();

            var userToken = (await this._dbService.GetListFromProcedure<DtoDeviceTokenResponse, DtoDeviceTokenRequest>(new DtoDeviceTokenRequest()
            {
                UserId=input.UserId!.Value
            }, Constants.AppConstants.PROC_GET_DEVICE_TOKEN)).FirstOrDefault();

            await  _pushNotificationService.SendPushNotificationAsync(new DtoNotificationMessage()
            {
                Message = template.TemplateString,
                Title = template.Title,
                DeviceToken=userToken.DeviceTokens,
                userId=input.UserId.ToString()
            });

            return result;

        }
        public async Task<List<DtoUserComment>> LoadComments(DtoPostCommentRequest input)
        {
            return await _dbService.GetListFromProcedure<DtoUserComment,DtoPostCommentRequest>(input, AppConstants.PROC_LOAD_COMMENTS);
        }
        public async Task<DtoCommonReponse> PostComments(DtoComment input)
        {
            var data = _automapper.Map<Domain.Models.Comment>(input);
            data.EntryDate = DateTime.UtcNow;
            await _commentRepository.CreateAsync(data);
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.POST_SUCCESS
            };
        }
    }
}
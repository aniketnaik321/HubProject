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


            //Code block for push notification
            var messageResult = (await this._dbService.GetListFromProcedure<DtoPushNotificationResponse, DtoMovementNotificationRequest>
                (new DtoMovementNotificationRequest()
                {
                    UserId = input.AssigneeUserId.Value,
                    IssueId = data.Id,
                    AssigneeUserId = input.AssigneeUserId.Value

                }, Constants.AppConstants.PROC_GET_TASK_ASSIGNMENT)).FirstOrDefault();


            await _pushNotificationService.SendPushNotificationAsync(new DtoNotificationMessage()
            {
                Message = messageResult.Message,
                Title = messageResult.Title,
                DeviceToken = messageResult.DeviceToken,
                userId = input.AssigneeUserId.ToString()!
            });

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
            //STEP 1: Get Template
            var result= await _dbService.CallProcedure(input, AppConstants.PROC_UPDATE_STATUS);
            var messageResult = (await this._dbService.GetListFromProcedure<DtoPushNotificationResponse, DtoMovementNotificationRequest>
                (new DtoMovementNotificationRequest()
            {
                UserId = input.ActionUserId.Value,
                IssueId =input.IssueId,                
                AssigneeUserId=input.UserId.Value

            }, Constants.AppConstants.PROC_MOVEMENT_NOTIFICATION)).FirstOrDefault();


            await  _pushNotificationService.SendPushNotificationAsync(new DtoNotificationMessage()
            {
                Message = messageResult.Message,
                Title = messageResult.Title,
                DeviceToken= messageResult.DeviceToken,
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
            if(input.File!=null && input.File.Length>0)
             await _dbService.CallProcedure<DtoIssuedDocument>(new DtoIssuedDocument() { 
            IssueId=input.IssueId.Value,
            CommentId=data.Id,
            EncodeFileName=input.EncodedFileName??string.Empty,
            FileName=input.File.FileName,
            FileSize=input.File.Length,
            UserId=input.UserId.Value

            }, AppConstants.PROC_CREATE_ISSUE_DOCUMENT);
            return new DtoCommonReponse()
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Message = AppConstants.POST_SUCCESS
            };
        }

        public async Task<List<DtoIssuedDocument>> GetDocumentList(int issueId)
        {
            return await _dbService.GetListFromProcedure<DtoIssuedDocument, DtoIssueDocumentRequest>(new DtoIssueDocumentRequest(){
            IssueId=issueId
            },AppConstants.PROC_GET_ISSUE_DOCUMENTs) ;
        }


        #region Background Jobs

        public async Task MoveTaskToInProgress()
        {
            //Code to get list of all users whose task is pending, to notify.
            var data = await _dbService.CallProcedure<DtoIssueDetailsForJob>(Constants.AppConstants.PROC_BG_MOVETAKSINPROGRESS);
            List<DtoNotificationMessage> messages=new List<DtoNotificationMessage>();

            foreach (var item in data) {
                messages.Add(new DtoNotificationMessage()
                {
                    DeviceToken=item.DeviceToken,
                    Message=item.NotificationMessage,
                    Title=item.NotificationTitle,
                    userId=item.AssigneeUserID,
                });
            }

            if(messages.Count>0)
                await _pushNotificationService.SendPushNotificationAsync(messages);

        }
            #endregion

        }
}
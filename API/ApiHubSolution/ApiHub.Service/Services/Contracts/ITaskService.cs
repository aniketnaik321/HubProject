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
    public interface ITaskService :IGenericService<DtoIssues>
    {
        Task<DtoCommonReponse> UpdateTaskStatus(DtoStatusUpdateRequest input);
        Task<List<DtoUserComment>> LoadComments(DtoPostCommentRequest input);
        Task<DtoCommonReponse> PostComments(DtoComment input);
        Task<List<DtoIssuedDocument>> GetDocumentList(int issueId);
        Task MoveTaskToInProgress();
    }
}

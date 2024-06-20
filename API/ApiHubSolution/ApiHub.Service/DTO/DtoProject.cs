
using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;

namespace ApiHub.Service.DTO
{
    public partial class DtoProject
    {
        public Guid Id { get; set; }

        public string ProjectName { get; set; } = null!;

        public string? ProjectTaskPrefix { get; set; }

        public string? Description { get; set; }

        public DateTime? CreatedOn { get; set; }

        public Guid? CreatedBy { get; set; }

        public int IssuesCount { get; set; } = 0;

        public float CompletionStatus { get; set; } = 0.0f;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public virtual ICollection<DtoIssues> Issues { get; set; } = new List<DtoIssues>();
    }

    public class DtoIssues
    {
        public int? Id { get; set; }

        public Guid? ProjectId { get; set; }

        public string? IssueKey { get; set; } = null!;

        public string Summary { get; set; } = null!;

        public string? Description { get; set; }

        public int? IssueType { get; set; }
        public int? CommentCount { get; set; }

        public int? PriorityId { get; set; }

        public string? PriorityName { get; set; }

        public int? StatusId { get; set; }

        public string? StatusName { get; set; }

        public string? StatusTagColorCode { get; set; }
        public string? PriorityTagColorCode { get; set; }

        public int? EstimatedTime { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? DueDate { get; set; }

        public DateTime? StartDate { get; set; }

        public Guid? AssigneeUserId { get; set; }

        public string? AssigneeUserName { get; set; }

        public Guid? ReporterUserId { get; set; }

        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public virtual Priority? Priority { get; set; }

        public virtual Project? Project { get; set; }

        public virtual Status? Status { get; set; }

    }

    public partial class DtoUserComment
    {
        public int Id { get; set; }

        public string UserComment { get; set; } = null!;

        public int? ParentCommentId { get; set; }

        public DateTime? EntryDate { get; set; }

        public Guid? UserId { get; set; }

        public string FullName { get; set; }

        public string PicturePath { get; set; }

        public int? IssueId { get; set; }

        public int CommentCount { get; set; }

        public virtual ICollection<DtoUserComment> InverseParentComment { get; set; } = new List<DtoUserComment>();

        public virtual DtoIssues? Issue { get; set; }

        public virtual DtoUserComment? ParentComment { get; set; }

        public virtual User? User { get; set; }
    }


    public partial class DtoProjectDocument
    {
        public int Id { get; set; }

        public string? DocumentTitle { get; set; }

        public string? Description { get; set; }

        public string? DocumentUrl { get; set; }



        public Guid? ProjectId { get; set; }

        public DateTime? CreatedOn { get; set; }
    }


    public partial class UserProfile
    {
        public int Id { get; set; }

        public Guid? DefaultProjectId { get; set; }

        public Guid? UserId { get; set; }

        public virtual User? User { get; set; }
    }

    public partial class DtoUserDeviceToken
    {
        [Parameter]
        public string UserId { get; set; }
        [Parameter]
        public string DeviceToken { get; set; }
    }

    public class DtoNotificationTemplateRequest
    {
        [Parameter]
        public string TemplateCode { get; set; }

    }

    public class DtoNotificationTemplateResponse
    {

        public string Id { get; set; }
        public string TemplateString { get; set; }
        public string Title { get; set; }

    }

    public class DtoDeviceTokenRequest
    {
        [Parameter]
        public Guid UserId { get; set; }

    }

    public class DtoDeviceTokenResponse
    {


        public string DeviceTokens { get; set; }


    }

    public class DtoNotificationResponse
    {
    
        public int Id { get; set; }
        public string NotificationTitle { get; set; }
        public string NotificationText { get; set; }
       
        public DateTime LogTimeStamp { get; set; }
        public string Extra1 { get; set; }
        public string Extra2 { get; set; }
        public bool IsRead { get; set; }
        public DateTime? ReadDateTime { get; set; }
    

}

    public class DtoNotificationLogRequest
    {
        [Parameter]
        public string NotificationTitle { get; set; }
        [Parameter]
        public string NotificationText { get; set; }
        [Parameter]
        public string UserId { get; set; }
        [Parameter]
        public string DeviceToken { get; set; }
        [Parameter]
        public string Extra1 { get; set; }
        [Parameter]
        public string Extra2 { get; set; }
    }


}

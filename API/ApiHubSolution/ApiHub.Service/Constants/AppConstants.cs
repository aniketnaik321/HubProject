

namespace ApiHub.Service.Constants
{
    public class AppConstants     
    {
        //Stored Procedure
        public const string PROC_CREATEUSER = "InsertUser";        
        public const string PROC_LOOKUP = "DataLookup";
        public const string PROC_SOFTDELETE = "SoftDelete";
        public const string PROC_USERSLIST = "GetUsersList";
        public const string PROC_GETPROJECTS = "PM_GetProjectList";
        public const string PROC_GETTASKS = "PM_GetTaskList";
        public const string PROC_ADDMACHINE_EVENT = "AddMachineEvent";
        public const string PROC_PASSWORD_RESET_REQUEST = "SendPasswordResetRequestEmail";
        public const string PROC_PASSWORD_RESET= "ResetUserPassword";
        public const string PROC_UPDATE_PASSWORD = "UpdatePassword";
        public const string PROC_UPDATE_STATUS = "PM_UpdateIssueStatus";
        public const string PROC_LOAD_COMMENTS = "PM_LoadTaskComments";
        public const string PROC_UPDATE_USER_STATUS = "UpdateUserStatus";
        public const string PROC_FAQ_LIST = "PM_FaqList";
        public const string PROC_UPDATE_DEVICE_TOKEN = "UpdateDeviceToken";
        public const string PROC_GET_NOTIFICATION_TEMPLATE = "PM_GetNotificationTemplate";
        public const string PROC_GET_DEVICE_TOKEN= "PM_GetDeviceToken";
        public const string PROC_GETNOTIFICATIONS = "PM_GetNotificationList";
        public const string PROC_LOG_NOTIFICATION= "PM_LogNotification";
        public const string PROC_MOVEMENT_NOTIFICATION = "PM_GetMovementNotificationData";
        public const string PROC_CREATE_ISSUE_DOCUMENT = "PM_CreateIssueDocument";
        public const string PROC_GET_ISSUE_DOCUMENTs = "PM_GetDocumentList";
        public const string PROC_GET_TASK_ASSIGNMENT = "PM_GetTaskAssignmentNotificationData";
        public const string PROC_GET_PROJECT_MEMBERS = "PM_GetMembersByProjectId";
        public const string PROC_ADD_PROJECT_MEMBERS = "PM_AddProjectMember";
        public const string PROC_BG_MOVETAKSINPROGRESS = "PM_BackgroundJobMoveTaskToInProgress";



        //Messages
        public const string SAVE_SUCCESS = "Record has been saved";
        public const string UPDATE_SUCCESS = "Record has been updated";
        public const string DELETE_SUCCESS = "Record has been deleted";
        public const string POST_SUCCESS = "Comment has been posted";

        //Lookup Constants
        public const string LOOKUP_USERS = "USERS_LOOKUP";
        public const string LOOKUP_PROJECTS = "PROJECT_LOOKUP";
        public const string LOOKUP_ISSUES= "ISSUE_LOOKUP";

        //Template Codes
        public const string T_TASK_ASSIGNED = "TASK_ASSIGNED";
        public const string T_TASK_MOVED = "TASK_MOVED";

    }
}

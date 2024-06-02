

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

        //Messages
        public const string SAVE_SUCCESS = "Record has been saved";
        public const string UPDATE_SUCCESS = "Record has been updated";
        public const string DELETE_SUCCESS = "Record has been deleted";
        public const string POST_SUCCESS = "Comment has been posted";

        //Lookup Constants
        public const string LOOKUP_USERS = "USERS_LOOKUP";
        public const string LOOKUP_PROJECTS = "PROJECT_LOOKUP";
        public const string LOOKUP_ISSUES= "ISSUE_LOOKUP";
    }
}

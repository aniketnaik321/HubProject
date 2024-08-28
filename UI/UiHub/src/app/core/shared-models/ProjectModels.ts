// DtoProject.interface.ts
export interface IProject {
    issuesCount: number;
    id: string;
    projectName: string;
    description?: string;
    projectTaskPrefix?:string;
    createdOn?: Date;
    createdBy?: string;
    startDate?: Date;
    endDate?: Date;
    issues?: IIssues[];
    completionStatus?:number;
    usersList?:string[];
  }
  
  // DtoIssues.interface.ts
  export interface IIssues {
    id: number;
    projectId?: string;
    issueKey: string;
    summary: string;
    description?: string;
    issueType?: number;
    priorityId?: number;
    priorityName?:string;
    statusId?: number;
    statusName?:string;
    estimatedTime?: number;
    commentCount?:number;
    startDate?: Date;
    dueDate?: Date;
    assigneeUserId?: string;
    reporterUserId?: string;
    assigneeUserName?:string;
    comments: Comment[];
  }

  export interface IIssueRequest{
      statusId: number;
      issueId: number;
      userId: string;
      userComment:string;
  }


  export interface IStatusUpdateRequest{
    status: boolean;
    userId: string;    
}

  
  
  // Comment.interface.ts
  export interface IComment {
    id?: number;
    userComment: string;
    parentCommentId?: number;
    entryDate?: Date;
    userId?: string;
    issueId?: number;
  }
  
  // Priority.interface.ts
  export interface IPriority {
    // Define Priority properties here
  }
  
  
  
  // Status.interface.ts
  export interface IStatus {
    // Define Status properties here
  }
  
  // DtoUserComment.interface.ts
  export interface IUserComment {
    id: number;
    userComment: string;
    parentCommentId?: number;
    entryDate?: Date;
    userId?: string;
    issueId?: number;
    fullName:string;
  commentCount:number;
    picturePath:string;
    inverseParentComment: IUserComment[];
    issue?: IIssues;
    parentComment?: IUserComment;
    user?: IUser;
  }
  
  // User.interface.ts
  export interface IUser {
    // Define User properties here
  }


  export interface IIssueDocument {
    issueId: number;
  commentId: number;
  fileName: string;
  encodeFileName: string;
  fileSize: number;
  fileType: string;
  }

  // dto-project-members.model.ts
export interface IProjectMembers {
  userId: string; // Guid is typically represented as a string in TypeScript
  userName: string;
  fullName: string;
  picturePath: string | null;
  emailId: string;
}

export interface IUserRoles
{
  id:string,
  RoleTitle:string
}
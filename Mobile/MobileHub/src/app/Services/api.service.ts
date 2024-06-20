import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginModel, IResetPasswordModel, IChangePasswordModel, IResetResetLinkRequest } from '../shared-models/IAccountModels';
import { ICommonResponse } from '../shared-models/ICommonResponse';
import { ILookupList } from '../shared-models/ILookupItem';
import { IPagedData } from '../shared-models/IPagedData';
import { IUserService } from '../shared-models/IUserService';
import { IPagedRequest, IPagedRequestWithoutFilters } from '../shared-models/PagedFilterRequest';
import { IProject, IIssues, IIssueRequest, IUserComment, IComment, IStatusUpdateRequest, IDeviceToken, INotificationRequest, INotificationResponse } from '../shared-models/ProjectModels';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl =  environment.ApiURL;

  deviceToken:string='';

  private notificationCount = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}
   // Increment the count
   addNotification() {
    this.notificationCount.next(this.notificationCount.value + 1);
  }


  resetNotification() {
    this.notificationCount.next(0);
  }

  getNotificationCount() {
    return this.notificationCount.asObservable();
  }

  ///************************************************************ */
  //  USER ACCOUNT MANAGMENT
  ///************************************************************ */
  Login(data:ILoginModel): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.baseUrl + '/Account/authenticate',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  ResetPassword(data:IResetPasswordModel): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.baseUrl + '/Account/ResetPassword',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  ChangePassword(data:IChangePasswordModel): Observable<ICommonResponse> {
    return this.http.put<ICommonResponse>(this.baseUrl + '/Account/ChangePassword',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  SendResetLink(data:IResetResetLinkRequest): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.baseUrl + '/Account/SendPasswordResetRequest',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  ///************************************************************ */
  //  Project Listings
  ///************************************************************ */

  getProjectList(data?:IPagedRequest): Observable<IPagedData<IProject>> {
    return this.http.post<IPagedData<IProject>>(this.baseUrl + '/Project/ProjectList',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(this.baseUrl + '/Project/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectDetailsById(id: any): Observable<IProject> {
    return this.http.get<IProject>(this.baseUrl + '/Project/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectLookupData(): Observable<ILookupList> {
    return this.http.get<ILookupList>(this.baseUrl + '/Project/lookup')
      .pipe(
        catchError(this.handleError)
      );
  }

  createProject(data:IProject): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.baseUrl + '/Project',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProject(data:IProject): Observable<ICommonResponse> {
    return this.http.put<ICommonResponse>(this.baseUrl + '/Project',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProject(input: string): Observable<ICommonResponse> {
    const url = `${this.baseUrl}/Project/${input}`; // Construct the URL with the taskId
    return this.http.delete<ICommonResponse>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

///************************************************************ */
  //  Tasks Related
  ///************************************************************ */
createTask(data:IIssues): Observable<ICommonResponse> {
  return this.http.post<ICommonResponse>(this.baseUrl + '/Task',data)
    .pipe(
      catchError(this.handleError)
    );
}

updateTask(data:IIssues): Observable<ICommonResponse> {
  return this.http.post<ICommonResponse>(this.baseUrl + '/Task/updateTask',data)
    .pipe(
      catchError(this.handleError)
    );
}

deleteTask(taskId: string): Observable<ICommonResponse> {
  const url = `${this.baseUrl}/Task/${taskId}`; // Construct the URL with the taskId
  return this.http.delete<ICommonResponse>(url)
    .pipe(
      catchError(this.handleError)
    );
}

updateTaskStatus(data:IIssueRequest): Observable<ICommonResponse> {
  return this.http.post<ICommonResponse>(this.baseUrl + '/Task/updateStatus',data)
    .pipe(
      catchError(this.handleError)
    );
}

getTaskList(data?:IPagedRequest): Observable<IPagedData<IIssues>> {
  return this.http.post<IPagedData<IIssues>>(this.baseUrl + '/Task/TaskList',data)
    .pipe(
      catchError(this.handleError)
    );
}

getTaskComments(data?:IPagedRequestWithoutFilters): Observable<IUserComment[]> {
  return this.http.post<IUserComment[]>(this.baseUrl + '/Task/loadUserComments',data)
    .pipe(
      catchError(this.handleError)
    );
}

postTaskComment(data?:IComment): Observable<ICommonResponse> {
  return this.http.post<ICommonResponse>(this.baseUrl + '/Task/PostUserComments',data)
    .pipe(
      catchError(this.handleError)
    );
}

getTaskLookupData(): Observable<ILookupList> {
  return this.http.get<ILookupList>(this.baseUrl + '/Task/lookup')
    .pipe(
      catchError(this.handleError)
    );
}


getTaskById(id: number): Observable<IIssues> {
  return this.http.get<IIssues>(this.baseUrl + '/Task/'+id)
    .pipe(
      catchError(this.handleError)
    );
}


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
  
  ///************************************************************ */
  //  User list
  ///************************************************************ */

  getUsers(data?:IPagedRequest): Observable<IPagedData<IUserService>> {
    return this.http.post<IPagedData<IUserService>>(this.baseUrl + '/Account/User',data)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUserById(id: number): Observable<IUserService> {
    return this.http.get<IUserService>(this.baseUrl + '/Account/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUserData(lookupId:number): Observable<ILookupList> {
    return this.http.get<ILookupList>(this.baseUrl + '/Account/lookup/'+lookupId)
      .pipe(
        catchError(this.handleError)
      );
  }
  createUser(data:IUserService): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.baseUrl + '/Account/register',data)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateUser(data:IUserService): Observable<ICommonResponse> {
    return this.http.put<ICommonResponse>(this.baseUrl + '/Account',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUserStatus(data:IStatusUpdateRequest): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.baseUrl + '/Users/UpdateUserStatus',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDeviceToken(data:IDeviceToken): Observable<ICommonResponse> {
    return this.http.post<ICommonResponse>(this.baseUrl + '/Users/UpdateDeviceToken',data)
      .pipe(
        catchError(this.handleError)
      );
  }

  

  getNotifications(data:IPagedRequest): Observable<IPagedData<INotificationResponse>> {
    return this.http.post<IPagedData<INotificationResponse>>(this.baseUrl + '/Users/GetNotificationList',data)
      .pipe(
        catchError(this.handleError)
      );
  }


  setDeviceToken(data:string) {
   this.deviceToken=data;
  }

  getDeviceToken() {
    return this.deviceToken;
   }
}

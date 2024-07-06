import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILookupItem } from 'src/app/core/shared-models/ILookupItem';
import { IPagedRequest, IPagedRequestWithoutFilters } from 'src/app/core/shared-models/PagedFilterRequest';
import { IComment, IIssueDocument, IIssues, IProject, IUserComment } from 'src/app/core/shared-models/ProjectModels';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  form: FormGroup;
  selectedData?: IIssues;
  documentList?: IIssueDocument[] = [];
  comments: IUserComment[] = [];
  id: string = '';
  comment: string = '';
  statusList?: ILookupItem[];
  priorityList?: ILookupItem[];
  assignee?: ILookupItem[];
  uploadedFile: any;
  reporters?: ILookupItem[];
  records: any[] = []; // Your recordset

  assigneeId: any;
  statusId: any;
  priorityId: any;
  // The dynamic columns to be displayed in the PrimeNG table
  columns: any[] = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private NavRoute: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.setupLookup().then(t => {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id')?.toString();
        this.LoadDetails(id!);
        this.LoadComments(Number(id));
        this.LoadIssueDocuments(id);
      });
    });
  }


  setupLookup(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.apiService.getTaskLookupData().subscribe(
        (data: any) => {
          this.statusList = data[0];
          this.priorityList = data[1];
          this.assignee = data[2];
          this.reporters = data[2];
          resolve(1);  // Resolving with a number, you can change it to whatever you need
        },
        (error: any) => {
          reject(error);  // Rejecting the promise in case of an error
        }
      );
    });
  }


  LoadDetails(id: any) {
    this.apiService.getTaskById(id).subscribe((data) => {
      this.selectedData = data;
      this.assigneeId = this.assignee?.find(t => t.code.toLocaleLowerCase() === this.selectedData?.assigneeUserId?.toLocaleLowerCase());
      this.statusId=this.statusList?.find(t => Number(t.code) === this.selectedData?.statusId);
      this.priorityId=this.priorityList?.find(t => Number(t.code) === this.selectedData?.priorityId);
    });
  }

  LoadIssueDocuments(id: any) {
    this.apiService.getIssueDocuments(id).subscribe((data) => {
      this.documentList = data;

      this.documentList = data.map(doc => ({
        ...doc,
        fileType: this.getFileExtension(doc.fileName)
      }));

    });
  }

  getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }

  LoadComments(id: any) {
    const request: IPagedRequestWithoutFilters = {
      keyId: id,
      pageNumber: 1,
      pageSize: 10
    };
    this.apiService.getTaskComments(request).subscribe((data) => {
      this.comments = data;
    });
  }

  PostComment() {
    const formData: FormData = new FormData();
    formData.append('userComment', this.comment);
    formData.append('issueId', this.selectedData!.id?.toString());
    formData.append('file', this.uploadedFile, this.uploadedFile?.name ?? "");

    this.apiService.postTaskComment(formData).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        this.LoadComments(this.selectedData?.id);
        this.comment = '';
        this.uploadedFile = null;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to post comment' });
      }
    );



    // const request: IComment={
    //   userComment:this.comment,
    //   issueId:this.selectedData?.id,

    // };


    //   formData.append('files', file, file.name);


    // this.apiService.postTaskComment(request).subscribe((data: any) => {
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
    //   this.LoadComments(this.selectedData?.id);
    //   this.comment='';
    // });

  }

  onUpload(event: any): void {

    this.uploadedFile = event.files[0];

  }

}

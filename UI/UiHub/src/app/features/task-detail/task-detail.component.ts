import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILookupItem } from 'src/app/core/shared-models/ILookupItem';
import { IPagedRequest, IPagedRequestWithoutFilters } from 'src/app/core/shared-models/PagedFilterRequest';
import { IComment, IIssues, IProject, IUserComment } from 'src/app/core/shared-models/ProjectModels';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  form: FormGroup;
  selectedData?: IIssues; 
  comments:IUserComment[]=[];
  id:string='';
  comment:string='';
  statusList?: ILookupItem[];
  priorityList?: ILookupItem[];
  assignee?: ILookupItem[];
  uploadedFile: any;
  reporters?: ILookupItem[];
  records: any[] = []; // Your recordset

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
    this.route.paramMap.subscribe(params => {     
      const id = params.get('id')?.toString();    
      this.LoadDetails(id!);
      this.LoadComments(Number(id));
    });
    this.setupLookup();
  }


  setupLookup(): void {
    // Call your API service for lazy loading
    this.apiService.getTaskLookupData().subscribe((data: any) => {
      this.statusList = data[0];
      this.priorityList = data[1];
      this.assignee=data[2];
      this.reporters=data[2];
    });
  }

  LoadDetails(id: any) {
    this.apiService.getTaskById(id).subscribe((data) => {
      this.selectedData = data;
    });
  }

  LoadComments(id: any) {
    const request: IPagedRequestWithoutFilters={
      keyId:id,
      pageNumber:1,
      pageSize:10
    };
    this.apiService.getTaskComments(request).subscribe((data) => {
      this.comments=data;
    });
  }

  PostComment(){


    const formData: FormData = new FormData();
    formData.append('userComment', this.comment);
    formData.append('issueId', this.selectedData!.id?.toString());
      formData.append('file', this.uploadedFile, this.uploadedFile?.name??"");
   
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
    
      this.uploadedFile=event.files[0];
    
  }

}

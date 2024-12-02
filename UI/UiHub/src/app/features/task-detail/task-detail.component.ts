import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Editor, Toolbar } from 'ngx-editor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { DefaultProjectService } from 'src/app/core/services/default-project.service';
import { ILookupItem } from 'src/app/core/shared-models/ILookupItem';
import { IPagedRequest, IPagedRequestWithoutFilters } from 'src/app/core/shared-models/PagedFilterRequest';
import { IComment, IIssueDocument, IIssues, IProject, IProjectMembers, IUserComment } from 'src/app/core/shared-models/ProjectModels';

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

  projectMembers: IProjectMembers[] = [];

  editor?: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];



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
    private authService: AuthService,
    private defaultProjectService: DefaultProjectService
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
        this.LoadProjectMembers();
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

  showHumanizeDate(input?: any): string {

    // Convert input date to a moment object
    const inputMoment = moment(input);

    // Get the difference between now and the input date
    const now = moment();

    // Use humanize to convert the duration to a human-readable string
    return inputMoment.from(now); // example output: "a few seconds ago"
  }

  formatMention(event: any):any{
   // alert("this is for test");
    return  `${event.fullName}`;
  }

  LoadProjectMembers(): void {
    // Call your API service for lazy loading
    this.apiService.getProjectMembers(this.defaultProjectService.getDefaultProjectId()).subscribe((data: any) => {
      this.projectMembers = data;
    });
  }


  LoadDetails(id: any) {
    this.apiService.getTaskById(id).subscribe((data) => {
      this.selectedData = data;
      this.assigneeId = this.assignee?.find(t => t.code.toLocaleLowerCase() === this.selectedData?.assigneeUserId?.toLocaleLowerCase());
      this.statusId = this.statusList?.find(t => Number(t.code) === this.selectedData?.statusId);
      this.priorityId = this.priorityList?.find(t => Number(t.code) === this.selectedData?.priorityId);
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
    if (this.uploadedFile)
      formData.append('file', this.uploadedFile ?? null, this.uploadedFile?.name ?? null);
    else {
      formData.append('file', new Blob());
    }

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


  quillModules = {
    mention: {
      allowedChars: /^[A-Za-z\s]*$/,
      mentionDenotationChars: ['@'],
     
      onSelect: (item: any, insertItem: any) => {
        insertItem(item);
      },
    },
    keyboard: {
      bindings: {
        enter: {
          key: 13, // Enter key
          handler: (range: any, context: any) => {
            // Check if the mention dropdown is active
            const mentionList = document.querySelector('.ql-mention-list');
            alert('test');
           // if (mentionList && mentionList.style.display === 'block') {
              // If active, simulate selection
             // const activeItem = mentionList.querySelector('.ql-mention-list-item.active');
             // if (activeItem) {
             //   activeItem.click();
                return false; // Prevent the default behavior (new line)
          //    }
         //   }
            // Default behavior if mention list is not active
            return true;
          },
        },
      },
    },
  };

  onContentChanged(event: any) {
    console.log('Editor content changed:', event);
  }
}




import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/core/services/api.service';
import { DefaultProjectService } from 'src/app/core/services/default-project.service';
import { ILookupItem } from 'src/app/core/shared-models/ILookupItem';
import { IPagedRequest } from 'src/app/core/shared-models/PagedFilterRequest';
import { IIssueRequest, IIssues, IProjectMembers, IUser } from 'src/app/core/shared-models/ProjectModels';
import Swal from 'sweetalert2';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {

  sharedData: any = { dialogDisplay: false }
  isTableView: boolean = false;
  statusList?: ILookupItem[];
  issueCommentsDialogDisplay: boolean = false;
  tableData?: IIssues[];
  totalRecords: number = 0;
  draggedRecord: IIssues | undefined | null;
  assignee?: ILookupItem[];
  form: FormGroup;

  @ViewChild("taskform")
  taskform!: TaskFormComponent


  projectMembers: IProjectMembers[] = [
    {
      userId: '39a82875-96c6-480f-b8ac-033af689e504',
      userName: 'aniket.naik4321@yopmail.com',
      fullName: 'AniketN',
      picturePath: null,
      emailId: 'aniket.naik4321@yopmail.com'
    }
  ];

  selectedUsers: IProjectMembers[] = [];

  showDropdown = false;
  @ViewChild('multiSelect') multiSelect!: MultiSelect;

  toggleMemberFilterDropdown() {
    // this.showDropdown = !this.showDropdown;

    if (this.multiSelect.overlayVisible) {
      this.multiSelect.hide();
    } else {
      this.multiSelect.show();
    }
  }

  getUserImage(user: IProjectMembers): string {
    return user.picturePath ? user.picturePath : 'assets/images/user_placeholder.png';
  }


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private defaultProjectService: DefaultProjectService
  ) {

    this.form = this.fb.group({
      userComment: [null],
      issueId: [null, Validators.required],
      statusId: [null, Validators.required],
      userId: [null, Validators.required]
    });
  }

  ToggleActiveView() {
    this.isTableView = !this.isTableView;
  }

  GetInitials(fullName :string){
   return this.apiService.getInitials(fullName);
  }

  GetInitialsColorCode(fullName :string){
    var initials= this.apiService.getInitials(fullName);
   return this.apiService.getColorCode(initials);
   }

  ShowTaskForm(inp: boolean): void {
    this.taskform.form.patchValue({
      id: null
    });
    this.sharedData.dialogDisplay = true;
  }

  ShowEditForm(selectedData: any): void {
    this.sharedData.dialogDisplay = true;
    this.taskform.ShowEditForm(selectedData);
  }

  setupLookup(): void {
    // Call your API service for lazy loading
    this.apiService.getTaskLookupData().subscribe((data: any) => {
      this.statusList = data[0];
      this.assignee = data[2];
      this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
      this.LoadProjectMembers();
    });
  }

  LoadProjectMembers(): void {
    // Call your API service for lazy loading
    this.apiService.getProjectMembers(this.defaultProjectService.getDefaultProjectId()).subscribe((data: any) => {
      this.projectMembers = data;
    });
  }

  // Generic method to check if a control is invalid and touched
  isControlInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control && control.invalid && control.touched) || false;
  }

  FormUpdate(data: any): void {
    this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
  }

  ngOnInit() {
    this.setupLookup();
    this.defaultProjectService.dropdownData$.subscribe((data) => {
      this.loadDataLazy(data);
      this.LoadProjectMembers();
    });
    
  }

  getTaskById(statusId: any): any {
    return this.tableData?.filter(T => T.statusId == statusId)
  }

  getTaskByStatusIdCount(statusId: any): any {
    return this.tableData?.filter(T => T.statusId == statusId).length
  }

  dragStart(inp: IIssues) {
    this.draggedRecord = inp;
  }

  drop(record: any) {
    if (this.draggedRecord) {
      if (this.draggedRecord.statusId === Number(record.code)) {
        return;
      };
      // Use patchValue to update the form values
      this.form.patchValue({
        issueId: this.draggedRecord.id,
        statusId: this.statusList?.find(T => T.code === record.code)
        // Add other fields if needed
      });

      //  this.draggedRecord.statusId=record.code;
      this.issueCommentsDialogDisplay = true;
      // this.UpdateStatus(this.draggedRecord,record);
    }
  }

  dragEnd(status: any) {
    
  }

  loadDataLazy(projectId: string) {
    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 100,
      filterKeys: "ProjectId",//event.filters, // Implement this based on your filtering logic
      filterValues: projectId,
      orderByKey: 'createdDate',
      sortDirection: 1
    };
    // Call your API service for lazy loading
    this.apiService.getTaskList(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response
    });
  }


  UpdateStatus(): void {
    const data: IIssueRequest = this.form.value;
    if (this.form.valid) {
      const formData = this.form.value;
      data.statusId = Number(formData.statusId.code);
      data.userId = formData.userId.code;
      this.apiService.updateTaskStatus(data).subscribe({
        next: (data) => {
          if (data.statusCode === 200) {
            this.messageService.add({ severity: 'success', summary: '', detail: data.message });
            this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
          }
          this.form.reset();
        },
        error: (data: any) => {
          this.messageService.add({ severity: 'error', summary: '', detail: data.error.message });
        },
        complete: () => {
          this.issueCommentsDialogDisplay = false;
        }
      });
    }
  }


  confirmDelete(taskId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#727cf5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteTask(taskId).subscribe(T => {
          if (T.statusCode === 200) {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
          }

        })

      }
    });
  }


  showStatusUpdateBox(): void {
    this.issueCommentsDialogDisplay = true;

  }

  filterByMembers(user:IUser): void {
    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'This is for test' });
  }

  onScroll() {
    if (this.tableData!.length < 100) {
      this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
    }
  }

}




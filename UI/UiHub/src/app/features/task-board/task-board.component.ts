import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/core/services/api.service';
import { DefaultProjectService } from 'src/app/core/services/default-project.service';
import { ILookupItem } from 'src/app/core/shared-models/ILookupItem';
import { IPagedRequest } from 'src/app/core/shared-models/PagedFilterRequest';
import { IIssueRequest, IIssues } from 'src/app/core/shared-models/ProjectModels';
import Swal from 'sweetalert2';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {

  sharedData: any = { dialogDisplay: false }
  statusList?: ILookupItem[];
  issueCommentsDialogDisplay: boolean = false;
  tableData?: IIssues[];
  totalRecords: number = 0;
  draggedRecord: IIssues | undefined | null;
  assignee?: ILookupItem[];
  form: FormGroup;

  @ViewChild("taskform")
  taskform!: TaskFormComponent 

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
      assigneeId: [null]
    });
  }

  ShowTaskForm(inp: boolean): void {
    this.taskform.form.patchValue({
      id: null
    });
    this.sharedData.dialogDisplay = true;
  }

  ShowEditForm(selectedData:any): void {
    this.sharedData.dialogDisplay=true;
    this.taskform.ShowEditForm(selectedData);
  }

  setupLookup(): void {
    // Call your API service for lazy loading
    this.apiService.getTaskLookupData().subscribe((data: any) => {
      this.statusList = data[0];
      this.assignee = data[2];
      this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
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
    //alert(JSON.stringify(status));
    //if(this.draggedRecord)
    // this.draggedRecord.statusId=status.code;
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
}




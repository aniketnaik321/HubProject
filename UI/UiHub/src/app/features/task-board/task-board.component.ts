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
import moment from 'moment';
import 'moment-timezone';

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
  selectedMembers: string[] = [];

  form: FormGroup;

  @ViewChild("taskform")
  taskform!: TaskFormComponent


  projectMembers: IProjectMembers[] = [];
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

  GetInitials(fullName: string) {
    return this.apiService.getInitials(fullName);
  }

  GetInitialsColorCode(fullName: string) {
    var initials = this.apiService.getInitials(fullName);
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

  timer: any;

  ngOnInit() {
    this.setupLookup();
    this.defaultProjectService.dropdownData$.subscribe((data) => {
      this.loadDataLazy(data);
      this.LoadProjectMembers();
    });

    // Set up the timer to call processIssues every second
    this.timer = setInterval(() => {
      this.processIssues(this.tableData ?? []);
    }, 1000); // 1000 milliseconds = 1 second

  }

  ngOnDestroy(): void {
    // Clear the timer when the component is destroyed
    if (this.timer) {
      clearInterval(this.timer);
    }
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
        statusId: this.statusList?.find(T => T.code === record.code),
        userId: this.assignee?.find(T => T.code === this.draggedRecord?.assigneeUserId?.toUpperCase())
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
    let filterKeySetTemp: string[] = ["ProjectId", "AssigneeUserId"]
    let filterValueSetTemp: string[] = [projectId];

    if (this.selectedMembers.length > 0) {
      filterValueSetTemp.push(this.selectedMembers.join('|'));
    }

    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 10000,
      filterKeys: filterKeySetTemp.join(','),//event.filters, // Implement this based on your filtering logic
      filterKeySet: filterKeySetTemp,
      filterValueSet: filterValueSetTemp,
      filterValues: filterValueSetTemp.join(','),
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

  filterByMembers(user: IProjectMembers): void {
    user.isSelected = !user.isSelected;
    this.selectedMembers = this.projectMembers.filter(T => T.isSelected === true).map(m => m.userId);
    this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
  }

  onScroll() {
    if (this.tableData!.length < 100) {
      this.loadDataLazy(this.defaultProjectService.getDefaultProjectId());
    }
  }


  // Helper function to format time differences as "Xh Ym Zs"
  formatTimeDifference(duration: moment.Duration): string {
    //const days = duration.days() ? `${duration.days()}d ` : '';
    const hours = duration.hours() ? `${duration.asHours().toFixed(0)}h ` : '';
    const minutes = duration.minutes() ? `${duration.minutes()}m ` : '';
    const seconds = duration.seconds() ? `${duration.seconds()}s` : '';
    return `${hours}${minutes}${seconds}`.trim();
    //return duration.format("h [hrs], m [min]");;
  }

  // Main function to process issues
  processIssues(issues: IIssues[]): void {
    const userTimeZone = moment.tz.guess(); // Gets the user's local time zone
    const currentDate = moment.utc();

    issues.forEach(issue => {
      if (issue.statusName?.toLocaleLowerCase() === 'in progress' || issue.statusName?.toLocaleLowerCase() === 'to do') {
      // Reset existing fields
      issue.IsOverdue = false;
      issue.OverdueTime = '';
      issue.StartedSinceTime = '';

      // Calculate overdue time if due date is present and has passed
      if (issue.dueDate) {
        const dueDate = moment.utc(issue.dueDate); // Convert from UTC to local time
        if (currentDate.isAfter(dueDate)) {
          issue.IsOverdue = true;
          const duration = moment.duration(currentDate.diff(dueDate));
          issue.OverdueTime = this.formatTimeDifference(duration);
        }
      }

      // Calculate started since time if start date is present
      if (issue.startDate) {
        //  const startDate = moment.utc(issue.startDate).tz(userTimeZone); // Convert from UTC to local time

        const startDate = moment.utc(issue.startDate); // Convert from UTC to local time
        const endDate = moment.utc(issue.dueDate); // Convert from UTC to local time
        const duration = moment.duration(currentDate.diff(startDate));
        const endingInDuration = moment.duration(endDate.diff(currentDate));
        const startingInDuration = moment.duration(startDate.diff(currentDate));
        issue.StartedSinceTime = this.formatTimeDifference(duration);
        issue.EndingIn = this.formatTimeDifference(endingInDuration);
        issue.StartingIn = this.formatTimeDifference(startingInDuration);
      }
    }
    });
  }



}




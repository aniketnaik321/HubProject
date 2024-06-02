import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/core/services/api.service';
import { DefaultProjectService } from 'src/app/core/services/default-project.service';
import { ILookupItem } from 'src/app/core/shared-models/ILookupItem';
import { IPagedData } from 'src/app/core/shared-models/IPagedData';
import { IPagedRequest } from 'src/app/core/shared-models/PagedFilterRequest';
import { IIssues } from 'src/app/core/shared-models/ProjectModels';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

  data?: IPagedData<IIssues>;
  tableData?: IIssues[];
  selecteddata?: IIssues;
  request?: IPagedRequest;

  @Output()
  dataUpdated: EventEmitter<boolean> = new EventEmitter(false);

  @Input()
  sharedData: any = { dialogDisplay: false }

  form: FormGroup;
  totalRecords: number = 0;
  pageSize: number = 10;
  statusList?: ILookupItem[];
  priorityList?: ILookupItem[];
  assignee?: ILookupItem[];
  reporters?: ILookupItem[];


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private defaultProjectService: DefaultProjectService
  ) {
    this.form = this.fb.group({
      id: [null],
      issueKey: [''],
      projectId: defaultProjectService.getDefaultProjectId(),
      summary: ['', Validators.required],
      description: ['', Validators.required],
      priorityId: [null, Validators.required],
      statusId: [null, Validators.required],
      startDate: [null, Validators.required],
      estimatedTime: [null, Validators.required],
      dueDate: [null],
      assigneeUserId: [null, Validators.required],
      reporterUserId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.setupLookup();
    this.loadDataLazy();
  }

  loadDataLazy(event?: TableLazyLoadEvent) {
    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 10,
      filterKeys: "",//event.filters, // Implement this based on your filtering logic
      filterValues: "",
      orderByKey: 'createdDate',
      sortDirection: 1
    };
    if (event) {
      // Update your request parameters based on the LazyLoadEvent
      request = {
        pageNumber: Math.floor(event.first! / this.pageSize) + 1,
        pageSize: this.pageSize,
        filterKeys: "",//event.filters, // Implement this based on your filtering logic
        filterValues: "",
        orderByKey: 'createdDate',
        sortDirection: (event.sortOrder ? 1 : 0)
      };
    }
    // Call your API service for lazy loading
    this.apiService.getTaskList(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response
    });
  }

  setupLookup(): void {
    // Call your API service for lazy loading
    this.apiService.getTaskLookupData().subscribe((data: any) => {
      this.statusList = data[0];
      this.priorityList = data[1];
      this.assignee = data[2];
      this.reporters = data[2];
    });
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }


  // Generic method to check if a control is invalid and touched
  isControlInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return (control && control.invalid && control.touched) || false;
  }

  ShowForm(): void {
    this.form.reset();
    this.sharedData.dialogDisplay = true;    
  }

  ShowEditForm(selectedData: any): void {
    this.apiService.getTaskById(selectedData.id).subscribe((data) => {
      this.selecteddata = data;
      // Set the form values using patchValue
      this.form.patchValue({
        id: data.id,
        issueKey: data.issueKey,
        summary: data.summary,
        description: data.description,
        issueType: data.issueType,
        priorityId: this.priorityList?.find(x => Number(x.code) === data.priorityId),
        statusId: this.statusList?.find(x => Number(x.code) === data.statusId),
        estimatedTime: data.estimatedTime,
        startDate: new Date(data.startDate!),
        dueDate: new Date(data.dueDate!),
        assigneeUserId: this.assignee?.find(x => x.code.toLocaleUpperCase() === data.assigneeUserId?.toLocaleUpperCase()),
        reporterUserId: this.reporters?.find(x => x.code.toLocaleUpperCase() === data.reporterUserId?.toLocaleUpperCase()),
      });
      this.sharedData.dialogDisplay = true;
    });
  }
  save() {
    const inputData: IIssues = this.form.value;
    if (this.form.valid) {
      // Your form is valid, you can submit the data
      const formData = this.form.value;
      inputData.id = formData.id;
      inputData.priorityId = formData.priorityId.code;
      inputData.statusId = formData.statusId.code;
      inputData.assigneeUserId = formData.assigneeUserId.code;
      inputData.reporterUserId = formData.reporterUserId.code;
      inputData.projectId = this.defaultProjectService.getDefaultProjectId();
      if (formData.id) {        
        this.apiService.updateTask(inputData).subscribe(data => {
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Task updated successfully!",
            footer: ''
          });
          this.loadDataLazy();
          this.sharedData.dialogDisplay = false;
          this.dataUpdated.emit(true);
          this.form.reset();
        });
      } else {
        this.apiService.createTask(inputData).subscribe(data => {
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Task created successfully!",
            footer: ''
          });
          this.loadDataLazy();
          this.sharedData.dialogDisplay = false;
          this.dataUpdated.emit(true);
          this.form.reset();
        });
      }

    } else {
      this.markFormGroupTouched(this.form);
    }
  }


  confirmRemove(item: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record removed successfully' });
      },
      reject: (type: ConfirmEventType) => {

      }
    });
  }

  cancel() {
    this.sharedData.dialogDisplay = false;
  }

}

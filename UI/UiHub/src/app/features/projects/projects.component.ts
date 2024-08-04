import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/core/services/api.service';
import { DefaultProjectService } from 'src/app/core/services/default-project.service';
import { ILookupItem } from 'src/app/core/shared-models/ILookupItem';
import { IPagedData } from 'src/app/core/shared-models/IPagedData';
import { IPagedRequest } from 'src/app/core/shared-models/PagedFilterRequest';
import { IProject } from 'src/app/core/shared-models/ProjectModels';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  machineAttributes?: IPagedData<IProject>;
  tableData?: IProject[];
  selecteddata?: IProject;
  request?: IPagedRequest;
  dialogDisplay: boolean = false;
  form: FormGroup;
  totalRecords: number = 0;
  pageSize: number = 10;
  dataTypeIdOptions?: ILookupItem[];
  usersList?: ILookupItem[];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private detaultProjectService: DefaultProjectService
  ) {
    this.form = this.fb.group({
      id: [null],
      projectName: ['', [Validators.required]],
      projectTaskPrefix:['', [Validators.required]],
      description: [''],            
      startDate:'',
      endDate:'',
      usersList:[[]]
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
      orderByKey: 'createdOn',
      sortDirection: 1
    };
    if (event) {
      // Update your request parameters based on the LazyLoadEvent
      request = {
        pageNumber: Math.floor(event.first! / this.pageSize) + 1,
        pageSize: this.pageSize,
        filterKeys: "",//event.filters, // Implement this based on your filtering logic
        filterValues: "",
        orderByKey: 'createdOn',
        sortDirection: (event.sortOrder?1:0)
      };
    }
    // Call your API service for lazy loading
    this.apiService.getProjectList(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response
    });
  }

  setupLookup(): void {
    // Call your API service for lazy loading
    this.apiService.getProjectLookupData().subscribe((data: any) => {
      this.dataTypeIdOptions = data[0];
      this.usersList=data[1];
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
    this.form.patchValue({
      attributeId: 0,
    }),
      this.dialogDisplay = true;
  }

  ShowEditForm(selectedData: any): void {
    this.apiService.getProjectById(selectedData.id).subscribe((data) => {
      this.selecteddata = data;
      // Set the form values using patchValue
      this.form.patchValue({
       id:this.selecteddata.id,
       projectName:this.selecteddata.projectName,
       description:this.selecteddata.description,
       projectTaskPrefix:this.selecteddata.projectTaskPrefix,
       startDate: new Date(data.startDate!),
        endDate: new Date(data.endDate!),
        usersList:this.selecteddata.usersList
      });
      this.dialogDisplay = true;
    });
  }
  save() {
    const inputData: IProject = this.form.value;
    if (this.form.valid) {
      // Your form is valid, you can submit the data
      const formData = this.form.value;      
      if(formData.id){
        this.apiService.updateProject(inputData).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });  
          this.loadDataLazy();
          this.dialogDisplay = false;
        });
      }else{
        this.apiService.createProject(inputData).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
  
          this.loadDataLazy();
          this.dialogDisplay = false;
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
        /* switch (type) {
           case ConfirmEventType.REJECT:
             this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
             break;
           case ConfirmEventType.CANCEL:
             this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
             break;
         }
         */
      }
    });
  }

  RemoveSelectedRecord(): void {

  }

  cancel() {
    this.dialogDisplay = false;
  }

  confirmDelete(taskId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteProject(taskId).subscribe(T => {
          if (T.statusCode === 200) {
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.loadDataLazy();
          }

        })

      }
    });
  }

}

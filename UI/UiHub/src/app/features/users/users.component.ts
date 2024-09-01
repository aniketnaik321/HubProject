import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ApiService } from 'src/app/core/services/api.service';
import { ILookupItem, ILookupList } from 'src/app/core/shared-models/ILookupItem';
import { IUserService } from 'src/app/core/shared-models/IUserService';
import { IPagedData } from 'src/app/core/shared-models/IPagedData';
import { IPagedRequest } from 'src/app/core/shared-models/PagedFilterRequest';
import Swal from 'sweetalert2';
import { IStatusUpdateRequest } from 'src/app/core/shared-models/ProjectModels';
import { Menu } from 'primeng/menu';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users?: IPagedData<IUserService>;
  tableData?: IUserService[];
  selectedUsers?: IUserService;
  request?: IPagedRequest;
  rolesList?: ILookupItem[];
  dialogDisplay: boolean = false;
  form: FormGroup;
  totalRecords: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  dataTypeIdOptions?: ILookupItem[];
  items: MenuItem[] | undefined;
  photoUrl: string | ArrayBuffer | null = null;
  selectedItem: any; // Variable to hold the selected item data

  @ViewChild('menu') menu: Menu | undefined;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.form = this.fb.group({
      UserId: [0],
      UserName: ['', [Validators.required]],
      FullName: [''],
      EmailId: [null],
      Photo: [null],
      RoleList: [[{ RoleId: 2, RoleTitle: 'Member' }], [Validators.required]]
    });

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            command: (data: any) => {
              this.ShowEditForm(data);
            }
          },
          {
            label: 'Password Reset Email',
            icon: 'pi pi-envelope',
            command: (data: any) => {
              this.ConfirmSendingLink(this.selectedItem);
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: (data: any) => {
              this.confirmDelete(data.id);
            }
          }
        ]
      }
    ];
  }



  onMenuButtonClick(event: Event, item: any) {
    this.selectedItem = item;  // Set the selected item data
    this.menu?.toggle(event);  // Use ViewChild reference to toggle the menu
  }


  ngOnInit(): void {
    this.setupLookup();
  }

  onUpload(event: any): void {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  loadDataLazy(event?: TableLazyLoadEvent) {
    let request: IPagedRequest = {
      pageNumber: 1,
      pageSize: 10,
      filterKeys: "",//event.filters, // Implement this based on your filtering logic
      filterValues: "",
      orderByKey: 'CreatedOn',
      sortDirection: 1
    };
    if (event) {
      // Update your request parameters based on the LazyLoadEvent
      request = {
        pageNumber: Math.floor(event.first! / this.pageSize) + 1,
        pageSize: this.pageSize,
        filterKeys: "",//event.filters, // Implement this based on your filtering logic
        filterValues: "",
        orderByKey: 'CreatedOn',
        sortDirection: event.sortOrder === 1 ? 1 : 0
      };
    }
    // Call your API service for lazy loading
    this.apiService.getUsers(request).subscribe((data) => {
      this.tableData = data.data; // Update with the actual property in your API response
      this.totalRecords = data.totalCount; // Update with the actual property in your API response
      this.totalPages = data.totalCount / this.pageSize;
    });
  }

  setupLookup(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.apiService.getUsersLookupData().subscribe(
        (data: any) => {
          this.rolesList = data[1];

          resolve(1);  // Resolving with a number, you can change it to whatever you need
        },
        (error: any) => {
          reject(error);  // Rejecting the promise in case of an error
        }
      );
    });
  }

  getInitials(fullName: string): string {
    if (!fullName) {
      return '';
    }

    const words = fullName.split(' ');

    if (words.length === 1) {
      // If there's only one word, return the first two characters
      return words[0].substring(0, 2).toUpperCase();
    }

    const initials = words
      .map(word => word.charAt(0).toUpperCase())
      .join('');

    return initials;
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
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
      UserId: 0,
    }),
      this.dialogDisplay = true;
  }

  ShowEditForm(selectedData: any): void {
    this.apiService.getUserById(selectedData.UserId).subscribe((data) => {
      this.selectedUsers = data;
      // Set the form values using patchValue
      this.form.patchValue({
        userId: this.selectedUsers?.userId,
        userName: this.selectedUsers?.name,
        fullName: this.selectedUsers?.fullName,
        emailId: this.selectedUsers?.emailId,
      });
      this.dialogDisplay = true;
    });
  }

  SendPasswordResetLink(data: any): void {
    this.apiService.SendPasswordResetLink(data.id).subscribe(data => {
      //this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        footer: ''
      });

    });
  }

  ConfirmSendingLink(data: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Password reset email will be sent to ' + data.emailId,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#727cf5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.SendPasswordResetLink(data);
      }
    });
  }


  loadUsers(): void {
    this.apiService.getUsers(this.request).subscribe((data) => {
      this.users = data;
    });
  }

  save() {
    const Users: IUserService = this.form.value;
    if (this.form.valid) {
      // Your form is valid, you can submit the data
      let formData: IUserService = { ...Users };
      if (Users) {

        formData.Roles = this.rolesList?.filter(role =>
          Users.RoleList?.some(userRole => userRole === role.code)
        )
          .map(role => ({
            id: role.code, // Assuming `role.code` corresponds to `RoleId`
            RoleTitle: role.name, // Assuming `role.title` corresponds to `RoleTitle`
          }))
          ?? [];
      }

      this.apiService.createUser(formData).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });

        this.loadUsers();
        this.dialogDisplay = false;
      });

    } else {
      this.markFormGroupTouched(this.form);
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
            this.loadDataLazy();
          }

        })

      }
    });
  }


  updateDelete(userId: string, status: boolean): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `User will be ${(status) ? 'Activated' : 'De-activated'}, are you sure?!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#727cf5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change status!'
    }).then((result) => {
      if (result.isConfirmed) {
        const data: IStatusUpdateRequest = {
          status: status,
          userId: userId
        }
        this.apiService.updateUserStatus(data).subscribe(T => {
          if (T.statusCode === 200) {
            Swal.fire(
              'Updated!',
              'User status has been updated.',
              'success'
            );
            this.loadDataLazy();
          }
        })

      }
    });
  }

  RemoveSelectedRecord(): void {

  }

  cancel() {
    this.dialogDisplay = false;
  }

}

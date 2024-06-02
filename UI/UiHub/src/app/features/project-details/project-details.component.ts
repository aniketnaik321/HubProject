import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/core/services/api.service';
import { IProject } from 'src/app/core/shared-models/ProjectModels';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

  form: FormGroup;
  selectedData?: IProject; 
  id:string='';

  records: any[] = []; // Your recordset

  // The dynamic columns to be displayed in the PrimeNG table
  columns: any[] = [];
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private NavRoute: Router
  ) {
    this.form = this.fb.group({
      attributeId: [0],
      specName: ['', [Validators.required]],
      description: [''],
      typeId: [null, [Validators.required]],
      isEventAttribute: [false],
      isCommon: [false],
      createdOn: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {     
      const id = params.get('id')?.toString();    
      this.LoadDetails(id!);
    });
  }


  LoadDetails(id: any) {
    this.apiService.getProjectDetailsById(id).subscribe((data) => {
      this.selectedData = data;
    });
  }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureRoutes } from './features.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';
import { DragDropModule } from 'primeng/dragdrop';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { StepsModule } from 'primeng/steps';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { WorkLogFormComponent } from './work-log-form/work-log-form.component';
import { EditorModule } from 'primeng/editor';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { TagModule } from 'primeng/tag';
import { FaqComponent } from './faq/faq.component';
import { FileUploadModule } from 'primeng/fileupload';
import { KnobModule } from 'primeng/knob';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipsModule } from 'primeng/chips';
import { ListboxModule } from 'primeng/listbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MentionModule } from 'angular-mentions';
import { NgxEditorModule } from "ngx-editor";
import { CardModule } from 'primeng/card';


import {
  provideCharts,
  withDefaultRegisterables,
  } from 'ng2-charts';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';
import { CattleDashboardComponent } from './cattle-dashboard/cattle-dashboard.component';
import { CattleMasterComponent } from './cattle-master/cattle-master.component';
import { CattleTransactionComponent } from './cattle-transaction/cattle-transaction.component';


@NgModule({
  declarations: [
   AnalyticsComponent,
   ProjectsComponent,
   HomeComponent,
   DashboardComponent,
   UsersComponent,
   ChangePasswordComponent,
   ProjectDetailsComponent,
   TaskBoardComponent,
   TaskFormComponent,
   WorkLogFormComponent,
   TaskDetailComponent,
   ProfileComponent,
   FaqComponent,
   CattleDetailsComponent,
   CattleDashboardComponent,
   CattleMasterComponent,
   CattleTransactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FeatureRoutes),
    SharedModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    DialogModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    PickListModule,
    DragDropModule,
    ScrollPanelModule,
    DividerModule,
    MenuModule,
    StepsModule,
    TooltipModule,
    TabViewModule,
    ProgressSpinnerModule,
    NgApexchartsModule,
    InputTextareaModule,
    EditorModule,
    TagModule,
    FileUploadModule,
    KnobModule,
    FullCalendarModule, // register FullCalendar with your app,
    AvatarGroupModule,
    AvatarModule,
    MultiSelectModule,
    OverlayPanelModule,
    ChipsModule,
    ListboxModule,
    InputSwitchModule,
    InputGroupModule,
    InputGroupAddonModule,
    MentionModule,
    NgxEditorModule,
    CardModule    
  ],
  providers: [MessageService,ConfirmationService,AuthGuard,provideCharts(withDefaultRegisterables())]
})
export class FeaturesModule { }

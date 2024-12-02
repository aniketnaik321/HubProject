import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { TaskBoardComponent } from "./task-board/task-board.component";

import { RolesComponent } from "./roles/roles.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { FaqComponent } from "./faq/faq.component";
import { CattleDashboardComponent } from "./cattle-dashboard/cattle-dashboard.component";
import { CattleDetailsComponent } from "./cattle-details/cattle-details.component";
import { CattleMasterComponent } from "./cattle-master/cattle-master.component";
import { CattleTransactionComponent } from "./cattle-transaction/cattle-transaction.component";

export const FeatureRoutes: Routes = [
    { path: '',      component: HomeComponent },
    { path: 'dashboard',      component: DashboardComponent } ,    
    { path: 'taskboard',      component: TaskBoardComponent },
    { path: 'analytics',      component: AnalyticsComponent },
    { path: 'projects',      component: ProjectsComponent },
    { path: 'users',      component: UsersComponent },
    { path: 'roles',      component: RolesComponent },
    { path: 'analytics',      component: AnalyticsComponent },
    { path: 'projectdetails/:id',      component: ProjectDetailsComponent },
    { path: 'taskdetail/:id',      component: TaskDetailComponent },
    { path: 'changepassword',      component: ChangePasswordComponent },
    { path: 'profile',      component: ProfileComponent },
    { path: 'faq',      component: FaqComponent },


    { path: 'ctdashboard',      component: CattleDashboardComponent } ,    
    { path: 'ctmaster',      component: CattleMasterComponent },
    { path: 'ctdetails/:id',      component: CattleDetailsComponent },
    { path: 'cttransaction',      component: CattleTransactionComponent }
    
];
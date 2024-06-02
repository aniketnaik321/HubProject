import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account/reset/:token', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
    {
      path: 'hrlite',
      loadChildren: () => import('./features/features.module').then(x=>x.FeaturesModule),
      canActivate: [AuthGuard],
  }]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

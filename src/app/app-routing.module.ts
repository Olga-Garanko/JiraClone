import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { QuillModule } from 'ngx-quill';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IssueComponent } from './pages/issue/issue.component';
import { ProjectComponent } from './pages/project/project.component';
import { SprintComponent } from './pages/sprint/sprint.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'issue/:id', component: IssueComponent, canActivate: [AuthGuard] },
      { path: 'sprint', component: SprintComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    QuillModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

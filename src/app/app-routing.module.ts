import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { QuillModule } from 'ngx-quill';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { IssueComponent } from './pages/issue/issue.component';
import { ProjectComponent } from './pages/project/project.component';
import { NewIssueComponent } from './pages/new-issue/new-issue.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { UserComponent } from './pages/user/user.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'new-project', component: NewProjectComponent },
      { path: 'issues', component: IssuesComponent },
      { path: 'issue/:id', component: IssueComponent },
      { path: 'new-issue', component: NewIssueComponent },
      { path: 'sprint', component: SprintComponent },
      { path: 'user', component: UserComponent },
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IssueComponent } from './pages/issue/issue.component';
import { ProjectComponent } from './pages/project/project.component';
import { SprintComponent } from './pages/sprint/sprint.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'issue/:id', component: IssueComponent },
      { path: 'sprint/:id', component: SprintComponent }
    ]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IssueService } from 'src/app/services/issue.service';
import { ProjectService } from 'src/app/services/project.service';
import { Issue, Project, User } from '../../services/interfaces';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  users: User[] = [];
  projects: Project[] = [];
  issues: Issue[] = [];
  constructor(public issueServ: IssueService, public auth: AuthService, public prj: ProjectService) {}

  ngOnInit(): void {
    this.auth.users$.subscribe((users: User[]) => {
      this.users = users;
    });
    this.prj.projects$.subscribe((projects: Project[]) => {
      this.projects = projects;
    });
    this.issueServ.issues$.subscribe((issues: Issue[]) => {
      this.issues = issues;
    });
  }

  getUserName(key) {
    if (!key) return;
    return this.users.find(i => i.uid == key).displayName;
  }

  getProjectName(key) {
    if (!key) return;
    return this.projects.find(i => i.id == key).title;
  }

}

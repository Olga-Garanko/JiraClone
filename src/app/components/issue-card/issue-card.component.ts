import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Issue, Project, User } from 'src/app/services/interfaces';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent implements OnInit {
  @Input() issue: Issue;
  users: User[] = [];
  projects: Project[] = [];
  constructor(private prj: ProjectService, public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.users$.subscribe((users: User[]) => {
      this.users = users;
    });
    this.prj.projects$.subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  getUserName(key) {
    if (!key || !this.users.length) return;
    return this.users.find(i => i.uid == key).displayName;
  }

  getProjectName(key) {
    if (!key || !this.projects.length) return;
    return this.projects.find(i => i.id == key).title;
  }

}

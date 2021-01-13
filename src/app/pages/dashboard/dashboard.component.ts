import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  users: any[] = [];
  constructor(public project: ProjectService, public auth: AuthService) {
    
  }

  getUserName(key) {
    if (!key) return;
    return this.users.find(i => i.uid == key).displayName;
  }

  ngOnInit(): void {
    this.auth.users$.subscribe(users => {
      this.users = users;
    });
    this.project.projects$.subscribe(projects => {
      this.projects = projects;
    });
  }

  removeItem(event, id) {
    event.preventDefault();
    this.project.remove(id)
  }

}

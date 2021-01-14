import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { User } from '../../services/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  constructor(public prj: ProjectService, public auth: AuthService) {
    
  }

  getUserName(key) {
    if (!key) return;
    return this.users.find(i => i.uid == key).displayName;
  }

  ngOnInit(): void {
    this.auth.users$.subscribe(users => {
      this.users = users;
    });
  }

  removeItem(event, id) {
    event.preventDefault();
    this.prj.remove(id)
  }

}

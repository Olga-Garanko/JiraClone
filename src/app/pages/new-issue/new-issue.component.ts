import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Issue, User, Project } from '../../services/interfaces';
import { IssueService } from 'src/app/services/issue.service';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  response = '';
  users: User[];
  projects: Project[];
  constructor(public issue: IssueService, public prj: ProjectService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.users$.subscribe((users: User[]) => {
      this.users = users;
    });
    this.prj.projects$.subscribe((projects: Project[]) => {
      this.projects = projects;
    });
    this.form = new FormGroup({
      summary: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      project: new FormControl(null, [Validators.required]),
      type: new FormControl('Story', [Validators.required]),
      priority: new FormControl('Major'),
      dueDate: new FormControl(null),
      assignee: new FormControl(null),
      description: new FormControl(null)
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.response = '';
    const issue: Issue = {
      summary: this.form.value.summary,
      project: this.form.value.project,
      type: this.form.value.type,
      priority: this.form.value.priority,
      dueDate: this.form.value.dueDate,
      assignee: this.form.value.assignee,
      description: this.form.value.description,
      created_date: new Date()
    }
    this.issue.create(issue)
    .then(() => {
      this.form.reset;
      this.submitted = false;
      this.router.navigate(['../../', 'issues']);
    },
    err => {
      this.submitted = false;
      this.response = err.message;
    })
  }
}

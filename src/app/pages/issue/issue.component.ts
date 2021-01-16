import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/services/issue.service';
import { ProjectService } from 'src/app/services/project.service';
import { Issue, Project, User } from '../../services/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  id: string;
  issue$: Observable<Issue>;
  project$: Observable<Project>;
  form: FormGroup;
  submitted = false;
  response = '';
  users$: Observable<User[]>;
  projects: Project[];

  constructor(
    private activateRoute: ActivatedRoute,
    public issueServ: IssueService,
    private prj: ProjectService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.issue$ = this.activateRoute.params
    .pipe(
      switchMap(params => {
        return this.issueServ.getById(params['id'])
      }))
    this.users$ = this.auth.getAll();
    this.form = new FormGroup({
      summary: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      project: new FormControl(null, [Validators.required]),
      type: new FormControl('Story', [Validators.required]),
      priority: new FormControl('Major'),
      dueDate: new FormControl(null),
      assignee: new FormControl(null),
      description: new FormControl(null)
    });
    this.issue$.subscribe(issue => {
      this.project$ = this.prj.getProjectById(issue.project);
      this.auth.getUserId(issue.assignee).subscribe(user => {
        this.form.controls.assignee.setValue(user.uid);
      });
      this.form.controls.summary.setValue(issue.summary);
      this.form.controls.type.setValue(issue.type);
      this.form.controls.priority.setValue(issue.priority);
      this.form.controls.dueDate.setValue(issue.dueDate);
      this.form.controls.description.setValue(issue.description);
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
    // this.issue.create(issue)
    // .then(() => {
    //   this.form.reset;
    //   this.submitted = false;
    //   this.router.navigate(['../../', 'issues']);
    // },
    // err => {
    //   this.submitted = false;
    //   this.response = err.message;
    // })
  }
}

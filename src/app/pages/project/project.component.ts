import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IssueService } from 'src/app/services/issue.service';
import { ProjectService } from 'src/app/services/project.service';
import { Issue, Project } from '../../services/interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project$: Observable<Project>;
  issues$: Observable<Issue[]>;
  constructor(private activateRoute: ActivatedRoute, public issueServ: IssueService, private prj: ProjectService) {}

  ngOnInit(): void {
    this.project$ = this.activateRoute.params
    .pipe(
      switchMap(params => {
        return this.prj.getProjectById(params['id'])
      })
    )
    this.issues$ = this.activateRoute.params
    .pipe(
      switchMap(params => {
        return this.issueServ.getAllByProject(params['id'])
      })
    )
  }

}

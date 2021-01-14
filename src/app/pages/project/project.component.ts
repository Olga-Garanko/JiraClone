import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IssueService } from 'src/app/services/issue.service';
import { ProjectService } from 'src/app/services/project.service';
import { Issue, Project, User } from '../../services/interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: string;
  project: Project;
  issues: Issue[] = [];
  constructor(private activateRoute: ActivatedRoute, public issueServ: IssueService, private prj: ProjectService) {}

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];   
    this.prj.getProjectById(this.id).subscribe(project => {
      this.project = project;
    });
    this.issueServ.issues$.subscribe((issues: Issue[]) => {
      this.issues = issues.filter(i => i.project == this.id);
    });
  }

}

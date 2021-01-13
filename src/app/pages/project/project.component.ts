import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../services/interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: string;
  project: Project;
  constructor(private activateRoute: ActivatedRoute, private prj: ProjectService) {}

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];   
    this.prj.getProjectById(this.id).subscribe(project => {
      this.project = project;
    });      
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  id: string;
  projects$: Observable<any>;
  projects: any[];
  project: any;
  constructor(private activateRoute: ActivatedRoute, private db: AngularFireDatabase) {
    this.id = activateRoute.snapshot.params['id'];
    this.projects$ = db.list('projects').valueChanges();
  }

  ngOnInit(): void {
    //this.items$.subscribe(i => console.log(i))
    this.projects$.subscribe(projects => {
      this.projects = projects;
      this.project = this.projects.find(i => i.id === this.id)
    });
  }

}

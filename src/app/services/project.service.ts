import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { User, Project } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  user: string;
  projects$: Observable<Project[]>;

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.user$.subscribe((user: User) => {
      this.user = user.uid;
    });
    this.projects$ = this.db.list<Project>('projects').valueChanges();
  }

  create(project) {
    const data = {
      ...project,
      type: project.type || 'Software',
      category: project.category || 'No category',
      lead: project.lead || this.user,
      owner: project.owner || this.user,
      url: project.url || 'No URL',
      description: project.description || '',
      created_date: Date.now()
    }
    const projectsRef = this.db.list('projects');
    return projectsRef.push(data)
    .then(res => {
      projectsRef.set(res.key, {
        ...data,
        id: res.key
      })
    })
  }

  remove(id) {
    const projectsRef = this.db.list('projects');
    return projectsRef.remove(id);
  }

  getProjectById(id) {
    return this.db.object<Project>(`projects/${id}`).valueChanges();
  }
}

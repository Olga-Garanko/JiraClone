import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';

export interface Product {
  uid: string;
  title: string,
  key: string,
  type: string,
  category: string,
  url: string,
  lead: string,
  owner: string,
  description: string,
  created_date: Date
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  user: string;
  products$: Observable<Product>;

  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.user$.subscribe(u => {
      this.user = u.uid;
    })
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

}

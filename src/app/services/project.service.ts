import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

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

  constructor(private auth: AuthService, private http: HttpClient) {
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
      description: project.description || ''
    }
    return this.http.post(`${environment.firebase.databaseURL}/projects.json`, data)
  }
}

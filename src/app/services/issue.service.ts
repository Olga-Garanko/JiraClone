import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Issue, User } from './interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  user: string;
  issues$: Observable<Issue[]>;
  constructor(private auth: AuthService, private db: AngularFireDatabase) {
    this.auth.user$.subscribe((user: User) => {
      this.user = user.uid;
    });
    this.issues$ = this.db.list<Issue>('issues').valueChanges();
  }

  create(issue) {
    const data = {
      ...issue,
      type: issue.type || 'Story',
      priority: issue.priority || 'Major',
      assignee: issue.assignee || this.user,
      owner: issue.owner || this.user,
      dueDate: issue.dueDate || Date.now(),
      description: issue.description || '',
      created_date: Date.now(),
      status: 'TO DO'
    }
    const issuesRef = this.db.list('issues');
    return issuesRef.push(data)
    .then(res => {
      issuesRef.set(res.key, {
        ...data,
        id: res.key
      })
    })
  }

  remove(id) {
    const issuesRef = this.db.list('issues');
    return issuesRef.remove(id);
  }

  getIssueById(id) {
    return this.db.object<Issue>(`issues/${id}`).valueChanges();
  }
}

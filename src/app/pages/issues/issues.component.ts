import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  items$: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.items$ = db.list('issues').valueChanges();
  }

  ngOnInit(): void {
  }

}

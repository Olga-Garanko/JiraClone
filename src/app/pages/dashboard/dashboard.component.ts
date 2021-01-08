import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items$: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.items$ = db.list('projects').valueChanges();
  }
  // <h1>{{ (item | async)?.name }}</h1>
  // item: Observable<any>;
  // constructor(db: AngularFireDatabase) {
  //   this.item = db.object('item').valueChanges();
  // }

  ngOnInit(): void {
    //this.items$.subscribe(i => console.log(i))
  }

}

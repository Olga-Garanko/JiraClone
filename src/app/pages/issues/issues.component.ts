import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueService } from 'src/app/services/issue.service';
import { Issue } from '../../services/interfaces';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  issues$: Observable<Issue[]>;
  constructor(public issueServ: IssueService) {}

  ngOnInit(): void {
    this.issues$ = this.issueServ.getAll();
  }
}

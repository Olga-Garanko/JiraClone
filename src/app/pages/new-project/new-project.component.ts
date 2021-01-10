import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { FbResponse } from '../../interfaces';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  response = '';

  constructor(public project: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      key: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      type: new FormControl(null),
      category: new FormControl(null),
      url: new FormControl(null),
      lead: new FormControl(null),
      description: new FormControl(null)
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.response = '';
    const project = {
      title: this.form.value.title,
      key: this.form.value.key.toUpperCase(),
      type: this.form.value.type,
      category: this.form.value.category,
      url: this.form.value.url,
      lead: this.form.value.lead,
      description: this.form.value.description,
      created_date: new Date()
    }
    this.project.create(project)
    .pipe(map((res: FbResponse) => {
      return {
        ...project,
        id: res.name
      }
    }))
    .subscribe(project => {
      this.form.reset;
      this.submitted = false;
      console.log(project);
      this.router.navigate(['../../', 'dashboard']);
    },
    err => {
      this.submitted = false;
      this.response = err.message;
    })
  }

}

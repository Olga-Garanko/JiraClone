import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  response = '';

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.response = '';
    const user = {
      displayName: this.form.value.displayName,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.signUp(user.displayName, user.email, user.password)
    .then(() => {
      this.form.reset;
      this.router.navigate(['../../', 'dashboard']);
      this.submitted = false;
    })
    .catch(err => {
      this.submitted = false;
      this.response = err.message;
    })
  }
}

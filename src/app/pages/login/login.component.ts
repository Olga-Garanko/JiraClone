import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  response = '';

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('julia@test.ua', [Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, Validators.minLength(6)])
    })
  }
  
  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.response = '';
    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.signIn(user.email, user.password)
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

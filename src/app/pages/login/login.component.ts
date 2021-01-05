import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
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
  returnSecureToken: true;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
  
  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(res => {
      this.form.reset;
      this.router.navigate(['../../', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
  }

}

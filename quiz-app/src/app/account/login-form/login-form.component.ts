import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.auth.authenticateUser(user).subscribe(data => {
      let d: any = data;
      console.log(d);
      if (d.success) {
        this.auth.storeUserData(d.token, d.user);
        this.router.navigate(['/dashboard']);
      } else {
        console.log(d.msg);
      }
    })

  }



}

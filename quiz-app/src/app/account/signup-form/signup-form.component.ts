import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private us: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    this.signUpForm = fb.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
    }
    this.auth.registerUser(user).subscribe( data => {
      let d: any = data
      if (d.success) {
        console.log('Registered')
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Something went wrong')
      }
    });
  }



}

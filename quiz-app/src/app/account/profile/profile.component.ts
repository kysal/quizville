import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: { username: string; id: string; } | undefined

  constructor(
    private auth: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.auth.getProfile().subscribe({
      next: profile => {this.user = (profile as any).user;},
      error: err => {
        console.log(err);
        return false;
      }
    });
  }

}

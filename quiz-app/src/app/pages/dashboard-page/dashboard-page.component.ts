import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  username: string = "";
  loaded: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.username.subscribe({
      next: value => {
        this.username = value.username;
        this.loaded = true;
      }
    })
  }
}

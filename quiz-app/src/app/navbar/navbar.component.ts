import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "../dialog/logout-dialog/logout-dialog.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logoutClick() {
    this.dialog.open(LogoutDialogComponent);
  }

  isToken(): boolean {
    return localStorage.getItem('id_token') != null;
  }

}

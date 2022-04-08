import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    private router: Router,
    private auth: AuthService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.auth.logout();
    this.dialogRef.close();
    this.router.navigate(['']);
  }

}

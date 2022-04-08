import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-publish-confirmation-dialog',
  templateUrl: './publish-confirmation-dialog.component.html',
  styleUrls: ['./publish-confirmation-dialog.component.css']
})
export class PublishConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PublishConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  publish(): void {

    this.dialogRef.close();
  }

}

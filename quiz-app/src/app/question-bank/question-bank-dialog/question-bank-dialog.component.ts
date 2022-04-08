import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { Question } from "../question-bank-list/question-bank-list.component";
import {QuestionService} from "../../services/question.service";
import {PublicService} from "../../services/public.service";

interface QuestionID {
  _id: string
}

@Component({
  selector: 'app-question-bank-dialog',
  templateUrl: './question-bank-dialog.component.html',
  styleUrls: ['./question-bank-dialog.component.css']
})
export class QuestionBankDialogComponent implements OnInit {
  questionList: Question[] = []

  constructor(
    private qs: QuestionService,
    private dialog: MatDialog,
    private pub: PublicService,
    public dialogRef: MatDialogRef<QuestionBankDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionID
  ) { }

  ngOnInit(): void {
    this.qs.getQuestionList().subscribe({
      next: list => {
        this.questionList = [];
        list.forEach(element => {
          this.qs.getQuestion(element).subscribe({
            next: value => {
              this.questionList.push(value);
            }
          })
        })
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

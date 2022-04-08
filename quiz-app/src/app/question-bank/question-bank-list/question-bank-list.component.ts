import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {elementAt} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  PublishConfirmationDialogComponent
} from "../../dialog/publish-confirmation-dialog/publish-confirmation-dialog.component";
import {PublicService} from "../../services/public.service";
import {AuthService} from "../../services/auth.service";

export interface Question {
  _id: string,
  uid: string,
  name: string,
  creator: string,
  description: string,
  marks: number,
  public: boolean,
  questionType: string,
  uniqueFields: {
    multipleChoice: {
      answerBox1: string,
      answerBox2: string,
      answerBox3: string,
      answerBox4: string,
      correctBox: string,
    },
    shortAnswer: {
      answer: string
    }
  }
}

@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['./question-bank-list.component.css']
})
export class QuestionBankListComponent implements OnInit {

  questionList: Question[] = []

  constructor(private qs: QuestionService,
              private dialog: MatDialog,
              private pub: PublicService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.qs.getQuestionList().subscribe({
      next: list => {
        this.questionList = [];
        list.forEach(element => {
          this.qs.getQuestion(element).subscribe({
            next: value => {
              if (value.name != null) this.questionList.push(value);
            }
          })
        })
      }
    })
  }

  publish(_id: string): void {
    this.pub.publishQuestion(_id).subscribe({
      next: value => {
        if (value.success) console.log("SUCCESS")
        else console.log("FAILURE: " + value.msg)
      }
    })
  }

  remove(index: number): void {
    this.qs.deleteQuestion(this.questionList[index]._id).subscribe({
      next: value => {
        if (value.success) {
          this.questionList.splice(index, 1);
        }
      }
    })
  }

  get uid() {
    return this.auth.uid;
  }

}

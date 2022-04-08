import { Component, OnInit } from '@angular/core';
import {PublicService} from "../../services/public.service";
import {Question} from "../../question-bank/question-bank-list/question-bank-list.component";
import {CreateQuizService} from "../../services/create-quiz.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-public-questions-list',
  templateUrl: './public-questions-list.component.html',
  styleUrls: ['./public-questions-list.component.css']
})
export class PublicQuestionsListComponent implements OnInit {

  loaded: boolean = false;
  questions: any[] = [];

  constructor(
    private pub: PublicService,
    // private create: CreateQuizService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.pub.getQuestionList().subscribe(value => {
      this.questions = value;
    });
  }

  importQuestion(question: any): void {
    console.log(question)
    question._id = undefined;
    this.pub.importQuestion(question).subscribe({
      next: value => {
        if (value.success) {
          console.log("SUCCESS")
        }
      }
    });
  }

  removeQuestion(index: number) {
    this.pub.removePublishedQuestion(this.questions[index]._id).subscribe({
      next: value => {
        if (value.success) {
          this.questions.splice(index, 1)
        } else {
          console.log(value.msg);
        }
      }
    })
  }

  get uid() {
    return this.auth.uid;
  }


}

import { Component, OnInit } from '@angular/core';
import {PublicService} from "../../services/public.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-public-quiz-list',
  templateUrl: './public-quiz-list.component.html',
  styleUrls: ['./public-quiz-list.component.css']
})
export class PublicQuizListComponent implements OnInit {

  loaded: boolean = false;
  quizzes: any[] = [];

  constructor(
    private pub: PublicService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.pub.getQuizList().subscribe(value => {
      this.quizzes = value;
    });
  }

  removeQuiz(index: number) {
    this.pub.removeQuiz(this.quizzes[index]._id).subscribe({
      next: value => {
        if (value.success) {
          this.quizzes.splice(index, 1)
        } else {
          console.log(value.msg);
        }
      }
    })
  }

  importQuestion(quiz: any): void {
    quiz._id = undefined;
    this.pub.importQuiz(quiz).subscribe({
      next: value => {
        if (value.success) {
          console.log("SUCCESS");
        }
      }
    })
  }

  get uid() {
    return this.auth.uid;
  }

}

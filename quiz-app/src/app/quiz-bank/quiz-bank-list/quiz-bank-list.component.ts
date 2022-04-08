import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../services/create-quiz.service";
import {QuizDetails, QuizService} from "../../services/quiz.service";
import {PublicService} from "../../services/public.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-quiz-bank-list',
  templateUrl: './quiz-bank-list.component.html',
  styleUrls: ['./quiz-bank-list.component.css']
})
export class QuizBankListComponent implements OnInit {

  quizList: QuizDetails[] = []

  constructor(private quizService: QuizService,
              private pub: PublicService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.quizService.getQuizList().subscribe({
      next: idList => {
        idList.forEach(element => {
          this.quizService.getQuizDisplayDetails(element).subscribe({
            next: quizDetail => {
              this.quizList.push(quizDetail);
            }
          })
        })
      }
    })
  }

  remove(index: number): void {
    this.quizService.deleteQuiz(this.quizList[index]._id).subscribe({next: value => {
      if (value.success) {
        this.quizList.splice(index, 1);
      } else {
        console.log("QUIZ DELETE: FAILURE")
      }
    }})
  }

  publish(_id: string): void {
    this.pub.publishQuiz(_id).subscribe({
      next: value => {
        if (value.success) console.log("SUCCESS");
        else console.log("FAILURE " + value.msg);
      }
    })
  }

}

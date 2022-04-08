import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {


  quizList: {
    _id: string,
    title: string,
    questLen: number
  }[] = []

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizService.getQuizList().subscribe({
      next: quizList => {
        this.quizList = [];
        quizList.forEach(quizId => {
          this.quizService.getQuizDisplayDetails(quizId).subscribe({
            next: details => {
              this.quizList.push(details);
            }
          })
        })
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {Report} from "./report";
import {elementAt} from "rxjs";
import {AuthService} from "../../services/auth.service";

interface Quiz {
  title: string,
  questions: Question[]
}

interface Question {
  name: string,
  description: string,
  marks: number,
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
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questionIndex: number;
  quiz: Quiz = {} as Quiz;
  started: boolean;
  progress: number;
  questionDisabled: boolean;
  activeQuest: Question = {} as Question;
  report: Report;
  endQuestionMsg: string = '';

  currentMarks: number = 0;
  marksAvailable: number = 0;
  questionsCorrect: number = 0;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private auth: AuthService
  ) {
    this.questionIndex = 0;
    this.progress = 0;
    this.started = false;
    this.questionDisabled = false;
    this.report = new Report();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.quizService.getQuiz(params.get('quizId') || "").subscribe({
          next: q => {
            this.quiz = q;
            this.report.initialiseQuiz(this.auth.uid,params.get('quizId') || "", this.quiz.title, this.quiz.questions.length, new Date(Date.now()));
            this.marksAvailable = 0;
            this.quiz.questions.forEach(element => this.marksAvailable += element.marks);
            this.started = true;
            this.changeQuestion();
          }
        })
      }
    })
  }

  private static compareAnswers(userAnswer: string, correctAnswer: string): boolean {
    return userAnswer == correctAnswer;
  }

  answer(value: string) {
    if(!this.questionDisabled) {
      let isCorrect: boolean = false;
      let correctAnswer: string = '';
      switch (this.activeQuest.questionType) {
        case 'multiple-choice-0':
          isCorrect = QuizComponent.compareAnswers(value, this.activeQuest.uniqueFields.multipleChoice.correctBox);
          correctAnswer = this.activeQuest.uniqueFields.multipleChoice.correctBox;
          break;
        case 'short-answer-1':
          isCorrect = QuizComponent.compareAnswers(value, this.activeQuest.uniqueFields.shortAnswer.answer);
          correctAnswer = this.activeQuest.uniqueFields.shortAnswer.answer;
          break;
      }

      let marksAwarded = 0;
      if (isCorrect) {
        marksAwarded = this.activeQuest.marks;
        this.questionsCorrect++;
        this.endQuestionMsg = 'Correct!'
      } else {
        this.endQuestionMsg = 'Incorrect! The correct answer was: "' + correctAnswer + '"';
      }

      this.currentMarks += marksAwarded;
      console.log(isCorrect);
      this.report.addQuestionReport(
        this.activeQuest.description,
        value,
        correctAnswer,
        isCorrect,
        marksAwarded);


      this.questionDisabled = true;
      this.incrementIndex();
    }

  }

  private incrementIndex() {
    this.questionIndex++;
    this.progress = this.questionIndex / this.quiz.questions.length * 100;
  }

  changeQuestion() {
    this.activeQuest = this.quiz.questions[this.questionIndex]
    this.questionDisabled = false;
  }

  private getMultipleChoiceAnswer(): string {
    let answerBoxes = [
      this.activeQuest.uniqueFields.multipleChoice.answerBox1,
      this.activeQuest.uniqueFields.multipleChoice.answerBox2,
      this.activeQuest.uniqueFields.multipleChoice.answerBox3,
      this.activeQuest.uniqueFields.multipleChoice.answerBox4,
    ];
    return answerBoxes[parseInt(this.activeQuest.uniqueFields.multipleChoice.correctBox) - 1]
  }

  startQuiz() {
    this.started = true;
  }

  endQuiz() {
    this.report.addEndResult(this.marksAvailable, this.currentMarks, this.questionsCorrect, new Date(Date.now()));
    this.quizService.postReport(this.report.asObject()).subscribe(value => {
      this.router.navigate(['report/' + value._id]);
    })

  }

  get isEnd(): boolean {
    return this.questionIndex == this.quiz.questions.length
  }

}

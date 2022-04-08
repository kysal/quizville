import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

export interface Quiz {
  title: string,
  uid: string,
  questions: Question[]
}

export interface Question {
  name: string,
  description: string,
  marks: number,
  addToQB: boolean,
  questionType: string,
  uniqueFields: {
    multipleChoice: {
      answerBox1: string,
      answerBox2: string,
      answerBox3: string,
      answerBox4: string,
      correctBox: number,
    },
    shortAnswer: {
      answer: string
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  saveQuiz(quiz: Quiz): Observable<any> {
    quiz.uid = this.auth.uid;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': this.auth.token
    });
    return this.http.post(this.auth.port + 'quiz/create',quiz, {headers: headers});
  }

  saveQuestion(question: any): Observable<any> {
    question.uid = this.auth.uid;
    return this.http.post(this.auth.port + 'question/create', question, {headers: this.auth.headers});
  }

  questionForm(): FormGroup {
    return this.fb.group({
      name: new FormControl(),
      description: new FormControl(),
      marks: new FormControl(),
      addToQB: true,
      creator: this.auth.uid,
      questionType: new FormControl(),
      uniqueFields: this.fb.group({
        multipleChoice: this.fb.group({
          answerBox1: new FormControl(),
          answerBox2: new FormControl(),
          answerBox3: new FormControl(),
          answerBox4: new FormControl(),
          correctBox: new FormControl(),
        }),
        shortAnswer: this.fb.group({
          answer: new FormControl()
        })
      })
    })
  }

}

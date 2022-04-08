import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question, Quiz} from "./create-quiz.service";

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  publishQuestion(questionId: string): Observable<any> {
    return this.http.post(this.auth.port + 'public/question', {_id: questionId}, {headers: this.auth.headers});
  }

  getQuestionList(): Observable<any> {
    return this.http.get(this.auth.port + 'public/question/list', {headers: this.auth.headers});
  }

  importQuestion(question: Question): Observable<any> {
    return this.http.post(this.auth.port + 'public/question/import', {question: question, userId: this.auth.uid}, {headers: this.auth.headers});
  }

  removePublishedQuestion(questionId: string): Observable<any> {
    return this.http.delete(this.auth.port + 'public/question/' + questionId, {headers: this.auth.headers});
  }

  publishQuiz(quizId: string): Observable<any> {
    return this.http.post(this.auth.port + 'public/quiz', {_id: quizId}, {headers: this.auth.headers});
  }

  getQuizList(): Observable<any> {
    return this.http.get(this.auth.port + 'public/quiz/list', {headers: this.auth.headers});
  }

  importQuiz(quiz: Quiz): Observable<any> {
    return this.http.post(this.auth.port + 'public/quiz/import', {question: quiz, userId: this.auth.uid}, {headers: this.auth.headers});
  }

  removeQuiz(quizId: string): Observable<any> {
    return this.http.delete(this.auth.port + 'public/quiz/' + quizId, {headers: this.auth.headers});
  }



}

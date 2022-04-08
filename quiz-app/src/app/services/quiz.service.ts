import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Quiz} from "./create-quiz.service";
import {QuizReport} from "../quiz/quiz/report";

export interface QuizDetails {
  _id: string,
  title: string,
  category: string,
  questLen: number,
  public: boolean,
}

interface Report {
  _id: string,
  title: string,
  quizLength: number,
  questionsCorrect: number,
  marksAwarded: number,
  marksAvailable: number,

}


@Injectable({
  providedIn: 'root'
})
export class QuizService {


  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getQuiz(id: string): Observable<any> {
    return this.http.get(this.auth.port + 'quiz/' + id, {headers: this.auth.headers});
  }

  getQuizList(): Observable<Array<any>> {
    return this.http.get(this.auth.port + 'quiz/quizList/' + this.auth.uid, {headers: this.auth.headers}) as Observable<Array<any>>;
  }

  getQuizDisplayDetails(quizId: string): Observable<QuizDetails> {
    return this.http.get(this.auth.port + 'quiz/quizDisplay/' + quizId, {headers: this.auth.headers}) as Observable<QuizDetails>
  }

  postReport(report: QuizReport): Observable<any> {
    return this.http.post(this.auth.port + 'report/add', report, {headers: this.auth.headers});
  }

  getReport(reportId: string): Observable<any> {
    return this.http.get(this.auth.port + 'report/' + reportId, {headers: this.auth.headers});
  }

  deleteQuiz(quizId: string): Observable<any> {
    return this.http.delete(this.auth.port + 'quiz/' + this.auth.uid + '/' + quizId, {headers: this.auth.headers});
  }


}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getQuestion(id: string): Observable<any> {
    return this.http.get(this.auth.port + 'question/' + id, {headers: this.auth.headers});
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(this.auth.port + 'question/'+ this.auth.uid + '/' + id);
  }

  getQuestionList(): Observable<Array<any>> {
    return this.http.get(this.auth.port + 'question/userlist/' + this.auth.uid, {headers: this.auth.headers}) as Observable<Array<any>>;
  }
}

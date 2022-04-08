import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  get username(): Observable<{username: string}> {
    return this.http.get(this.auth.port + "users/username/" + this.auth.uid, {headers: this.auth.headers}) as Observable<{username: string}>;
  }
}

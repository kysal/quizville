import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt'

export interface User {
  username: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  authToken: any;
  public user: any;


  constructor(private http:HttpClient,
              private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.authToken = localStorage.getItem('id_token');
    let u = localStorage.getItem('user');
    if (u != null) this.user = JSON.parse(u)
  }

  registerUser(user: object) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

    console.log(headers)

    return this.http.post(this.port + 'users/register', user, {headers: headers}).pipe(
      map(res => res)
    )
  }

  authenticateUser(user: { password: any; username: any }) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
    return this.http.post(this.port + 'users/authenticate', user, {headers: headers}).pipe(
      map(res => res)
    )
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': this.authToken
    });
    return this.http.get(this.port + 'users/profile', {headers: headers}).pipe(
      map(res => res)
    )
  }

  storeUserData(token: string, user: object) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(): boolean {
    if (localStorage.getItem('id_token') == null) return false;
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('id_token') || undefined);
  }

  get uid(): string {
    return (JSON.parse(localStorage.getItem('user') || "{}") as User).id
  }

  get token(): string {
    return (localStorage.getItem('id_token') || "")
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': this.token
    })
  }

  get port(): string {
    return 'http://localhost:8080/';
    // return '';
  }

}

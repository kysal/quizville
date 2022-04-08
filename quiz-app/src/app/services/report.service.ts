import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {BriefReport} from "../report-list/report-list.component";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // getReport() {
  //
  // }

  getBriefReport(reportId: string): Observable<BriefReport> {
    return this.http.get(this.auth.port + 'report/brief/' + reportId, {headers: this.auth.headers}) as Observable<BriefReport>;
  }

  getReportList(): Observable<Array<any>> {
    return this.http.get(this.auth.port + 'report/list/' + this.auth.uid, {headers: this.auth.headers}) as Observable<Array<any>>;
  }

}

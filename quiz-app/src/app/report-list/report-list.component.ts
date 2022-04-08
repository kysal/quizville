import { Component, OnInit } from '@angular/core';
import {ReportService} from "../services/report.service";
import {MatTableDataSource} from "@angular/material/table";

export interface BriefReport {
  _id: string,
  title: string,
  postDate: Date,
  marksAwarded: number,
  marksAvailable: number
}

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports: BriefReport[]
  displayedColumns: string[] = ['title', 'score', 'possibleScore' ,'date', 'fullReport']
  loaded: boolean;
  dataSource: MatTableDataSource<BriefReport> | undefined;
  listLength: number;

  constructor(
    private reportService: ReportService
  ) {
    this.loaded = false;
    this.reports = [];
    this.listLength = 1;

    this.reportService.getReportList().subscribe({next: quizList => {
        this.reports = [];
        this.listLength = quizList.length;
        quizList.forEach(element => {
          this.reportService.getBriefReport(element).subscribe({next: report => {
              if (report.postDate == undefined) report.postDate = new Date(0);
              else report.postDate = new Date(report.postDate);
              this.reports.push(report);
            }})});
        console.log(this.reports)
        this.dataSource = new MatTableDataSource<BriefReport>(this.reports);
        this.loaded = true;
      }})
  }

  ngOnInit(): void {

  }

  btn(): void {
    console.log(this.reports);
  }

  timeSince(date: Date) {

    var seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

}

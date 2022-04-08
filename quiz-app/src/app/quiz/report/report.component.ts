import { Component, OnInit } from '@angular/core';
import {Report} from "../quiz/report";
import {ActivatedRoute} from "@angular/router";
import {QuizDetails, QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  loaded: boolean
  report: Report
  quizDisplay: QuizDetails

  constructor(
    private route: ActivatedRoute,
    private qs: QuizService
  ) {
    this.loaded = false;
    this.report = new Report();
    this.quizDisplay = {} as QuizDetails;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.qs.getReport(params.get('reportId') || "").subscribe({
          next: r => {
            this.report = Report.parseReport(r);
            this.qs.getQuizDisplayDetails(this.report.quizDetails.qid).subscribe({
              next: q => this.quizDisplay = q as QuizDetails
            })
            this.loaded = true;
          }
        })
      }
    })
  }

  get timeTaken() {
    let d  = new Date(new Date(this.report.quizDetails.endTime).getTime() - new Date(this.report.quizDetails.startTime).getTime())
    return "" + d.getMinutes() + "m" + d.getSeconds() + "s"
  }

}

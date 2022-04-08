import {elementAt} from "rxjs";

interface QuizDetails {
  uid: string,
  qid: string,
  name: string,
  quizLength: number,
  marksAvailable: number,
  marksAwarded: number,
  questionsCorrect: number,
  startTime: Date,
  endTime: Date
}

interface QuestionDetails {
  description: string,
  userAnswer: string,
  correctAnswer: string,
  isCorrect: boolean,
  marksAwarded: number
}

export interface QuizReport {
  uid: string
  qid: string,
  name: string,
  quizLength: number,
  marksAvailable: number,
  marksAwarded: number,
  questionsCorrect: number
  questionDetails: QuestionDetails[],
  startTime: Date,
  endTime: Date,
}

export class Report {
  quizDetails: QuizDetails
  questionResults: QuestionDetails[]

  constructor() {
    this.quizDetails = {} as QuizDetails;
    this.questionResults = [];
  }

  initialiseQuiz(uid: string, qid: string, name: string, quizLength: number, startTime: Date) {
    this.quizDetails = {
      uid: uid,
      qid: qid,
      name: name,
      quizLength: quizLength,
      startTime: startTime
    } as QuizDetails;
  }

  addQuestionReport(description: string,
                    userAnswer: string,
                    correctAnswer: string,
                    isCorrect: boolean,
                    marksAwarded: number) {
    this.questionResults.push({description, userAnswer, correctAnswer, isCorrect, marksAwarded});
  }

  addEndResult(marksAvailable: number,
               marksAwarded: number,
               questionsCorrect: number,
               endTime: Date) {
    this.quizDetails.marksAvailable = marksAvailable;
    this.quizDetails.marksAwarded = marksAwarded;
    this.quizDetails.questionsCorrect = questionsCorrect;
    this.quizDetails.endTime = endTime;
  }

  asObject(): QuizReport {
    let i: QuizReport = this.quizDetails as QuizReport;
    i.questionDetails = this.questionResults;
    return i;
  }

  static parseReport(obj: QuizReport): Report {
    let r = new Report();
    r.initialiseQuiz(obj.uid, obj.qid, obj.name, obj.quizLength, obj.startTime);
    obj.questionDetails.forEach(i => {
      r.addQuestionReport(i.description, i.userAnswer, i.correctAnswer, i.isCorrect, i.marksAwarded);
    });
    r.addEndResult(obj.marksAvailable, obj.marksAwarded, obj.questionsCorrect, obj.endTime);
    return r;
  }



}

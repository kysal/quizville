import {Component, Input, OnInit} from '@angular/core';

export interface Question {
  name: string,
  description: string,
  marks: number,
  questionType: string,
  uniqueFields: {
    multipleChoice: {
      answerBox1: string,
      answerBox2: string,
      answerBox3: string,
      answerBox4: string,
      correctBox: string,
    },
    shortAnswer: {
      answer: string
    }
  }
}


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() currentQuestion: any
  disabled: boolean = false;

  constructor() {

  }

  ngOnInit() {
  }

  answer(box: string) {
    this.disabled = true;
  }


}

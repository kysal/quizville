import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AnsBox, QType} from "../create-quiz-form/create-quiz-form.component";
import {CreateQuizService} from "../../services/create-quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-question-form',
  templateUrl: './create-question-form.component.html',
  styleUrls: ['./create-question-form.component.css']
})
export class CreateQuestionFormComponent implements OnInit {

  form: FormGroup;
  questionTypes: QType[] = [
    {value: 'multiple-choice-0', viewValue: 'Multiple Choice'},
    {value: 'short-answer-1', viewValue: 'Short Answer'}
  ]
  answerBoxes: AnsBox[] = [
    {value: 1, viewValue: 'Answer Box 1'},
    {value: 2, viewValue: 'Answer Box 2'},
    {value: 3, viewValue: 'Answer Box 3'},
    {value: 4, viewValue: 'Answer Box 4'},
  ]

  constructor(
    private fb: FormBuilder,
    private create: CreateQuizService,
    private router: Router
  ) {
    this.form = this.create.questionForm();
    this.form.addControl('uid', new FormControl());
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.create.saveQuestion(this.form.value).subscribe({
      next: value => {
        if (value.success) {
          this.router.navigate(['../../question-bank']);
        } else {
          console.log(value);
        }
      }
    });
  }

}

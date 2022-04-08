import { Component } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder} from "@angular/forms";
import {CreateQuizService} from "../../services/create-quiz.service";
import {MatDialog} from "@angular/material/dialog";
import {QuestionBankDialogComponent} from "../../question-bank/question-bank-dialog/question-bank-dialog.component";
import {Router} from "@angular/router";
import {QuestionService} from "../../services/question.service";

export interface QType {
  value: string;
  viewValue: string;
}
export interface AnsBox {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-create-quiz-form',
  templateUrl: './create-quiz-form.component.html',
  styleUrls: ['./create-quiz-form.component.css']
})
export class CreateQuizFormComponent {

  quizForm: FormGroup;
  questionTypes: QType[] = [
    {value: 'multiple-choice-0', viewValue: 'Multiple Choice'},
    {value: 'short-answer-1', viewValue: 'Short Answer'}
  ];
  answerBoxes: AnsBox[] = [
    {value: 1, viewValue: 'Answer Box 1'},
    {value: 2, viewValue: 'Answer Box 2'},
    {value: 3, viewValue: 'Answer Box 3'},
    {value: 4, viewValue: 'Answer Box 4'},
  ];
  quizCategories: QType[] = [
    {value: 'maths', viewValue: 'Mathematics'},
    {value: 'generalKnowledge', viewValue: 'General Knowledge'}
  ]

  constructor(
    private fb: FormBuilder,
    private create: CreateQuizService,
    private dialog: MatDialog,
    private router: Router,
    private questService: QuestionService
  ) {
    this.quizForm = this.fb.group({
      title: new FormControl(),
      category: new FormControl(),
      questions: this.fb.array([])
    });
  }

  createNewQuestion(): void {
    const question = this.create.questionForm();
    this.questions.push(question);
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  onSubmit(): void {
    this.create.saveQuiz(this.quizForm.value).subscribe({
      next: value => {
        console.log(value);
        if (value.success) {
          this.router.navigate(['../dashboard']);
        }
      }
    });
  }

  deleteQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  openQuestionBankDialog() {
    let dialogRef = this.dialog.open(QuestionBankDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: value => this.importQuestionFromBank(value)
    })
  }

  importQuestionFromBank(questionId: string) {
    this.questService.getQuestion(questionId).subscribe({
      next: question => {
        let newQuestionForm = this.fb.group({
          name: question.name,
          description: question.description,
          marks: question.marks,
          addToQB: false,
          questionType: question.questionType,
          uniqueFields: this.fb.group({
            multipleChoice: this.fb.group({
                  answerBox1: question.uniqueFields.multipleChoice.answerBox1,
                  answerBox2: question.uniqueFields.multipleChoice.answerBox2,
                  answerBox3: question.uniqueFields.multipleChoice.answerBox3,
                  answerBox4: question.uniqueFields.multipleChoice.answerBox4,
                  correctBox: question.uniqueFields.multipleChoice.correctBox as number,
            }),
            shortAnswer: this.fb.group({
              answer: question.uniqueFields.shortAnswer.answer
            })
          })
        })
        console.log(newQuestionForm)
        this.questions.push(newQuestionForm);

      }
    })
  }

  ngOnInit(): void {

  }

  // form = new FormGroup({
  //   title: new FormControl(),
  //   questions: new FormArray([])
  // });
  //
  //
  // addQuestionField() {
  //   this.questionArr.push(new FormGroup({
  //     name: new FormControl(),
  //     description: new FormControl(),
  //     answer: new FormControl()
  //   }))
  //   console.log(this.form)
  // }
  //
  // get questionArr() {
  //   return this.form.get('questions') as FormArray;
  // }

}

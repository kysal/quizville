import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBankListComponent } from './quiz-bank-list.component';

describe('QuizBankListComponent', () => {
  let component: QuizBankListComponent;
  let fixture: ComponentFixture<QuizBankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizBankListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

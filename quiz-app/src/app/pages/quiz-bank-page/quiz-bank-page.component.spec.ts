import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBankPageComponent } from './quiz-bank-page.component';

describe('QuizBankPageComponent', () => {
  let component: QuizBankPageComponent;
  let fixture: ComponentFixture<QuizBankPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizBankPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBankPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

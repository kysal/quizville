import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankPageComponent } from './question-bank-page.component';

describe('QuestionBankPageComponent', () => {
  let component: QuestionBankPageComponent;
  let fixture: ComponentFixture<QuestionBankPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionBankPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBankPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

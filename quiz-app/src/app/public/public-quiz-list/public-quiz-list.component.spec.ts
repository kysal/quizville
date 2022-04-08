import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicQuizListComponent } from './public-quiz-list.component';

describe('PublicQuizListComponent', () => {
  let component: PublicQuizListComponent;
  let fixture: ComponentFixture<PublicQuizListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicQuizListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicQuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

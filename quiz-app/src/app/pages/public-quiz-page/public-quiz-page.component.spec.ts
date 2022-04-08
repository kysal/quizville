import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicQuizPageComponent } from './public-quiz-page.component';

describe('PublicQuizPageComponent', () => {
  let component: PublicQuizPageComponent;
  let fixture: ComponentFixture<PublicQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicQuizPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

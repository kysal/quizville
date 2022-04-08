import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicQuestionsPageComponent } from './public-questions-page.component';

describe('PublicQuestionsPageComponent', () => {
  let component: PublicQuestionsPageComponent;
  let fixture: ComponentFixture<PublicQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicQuestionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

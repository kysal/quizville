import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicQuestionsListComponent } from './public-questions-list.component';

describe('PublicQuestionsListComponent', () => {
  let component: PublicQuestionsListComponent;
  let fixture: ComponentFixture<PublicQuestionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicQuestionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicQuestionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

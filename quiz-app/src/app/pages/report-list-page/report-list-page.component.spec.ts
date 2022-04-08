import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListPageComponent } from './report-list-page.component';

describe('ReportListPageComponent', () => {
  let component: ReportListPageComponent;
  let fixture: ComponentFixture<ReportListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

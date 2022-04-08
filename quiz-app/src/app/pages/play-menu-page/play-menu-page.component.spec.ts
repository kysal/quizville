import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMenuPageComponent } from './play-menu-page.component';

describe('PlayMenuPageComponent', () => {
  let component: PlayMenuPageComponent;
  let fixture: ComponentFixture<PlayMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayMenuPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

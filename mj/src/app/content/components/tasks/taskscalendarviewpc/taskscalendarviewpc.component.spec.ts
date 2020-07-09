import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskscalendarviewpcComponent } from './taskscalendarviewpc.component';

describe('TaskscalendarviewpcComponent', () => {
  let component: TaskscalendarviewpcComponent;
  let fixture: ComponentFixture<TaskscalendarviewpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskscalendarviewpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskscalendarviewpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

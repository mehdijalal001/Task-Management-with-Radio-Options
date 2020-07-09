import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskspopupviewpcComponent } from './taskspopupviewpc.component';

describe('TaskspopupviewpcComponent', () => {
  let component: TaskspopupviewpcComponent;
  let fixture: ComponentFixture<TaskspopupviewpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskspopupviewpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskspopupviewpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

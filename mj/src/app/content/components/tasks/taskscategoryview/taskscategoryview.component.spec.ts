import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskscategoryviewComponent } from './taskscategoryview.component';

describe('TaskscategoryviewComponent', () => {
  let component: TaskscategoryviewComponent;
  let fixture: ComponentFixture<TaskscategoryviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskscategoryviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskscategoryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

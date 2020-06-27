import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskscategoryviewformComponent } from './taskscategoryviewform.component';

describe('TaskscategoryviewformComponent', () => {
  let component: TaskscategoryviewformComponent;
  let fixture: ComponentFixture<TaskscategoryviewformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskscategoryviewformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskscategoryviewformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

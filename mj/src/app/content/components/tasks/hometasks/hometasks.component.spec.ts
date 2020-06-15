import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometasksComponent } from './hometasks.component';

describe('HometasksComponent', () => {
  let component: HometasksComponent;
  let fixture: ComponentFixture<HometasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

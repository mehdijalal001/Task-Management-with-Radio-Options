import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficetasksComponent } from './officetasks.component';

describe('OfficetasksComponent', () => {
  let component: OfficetasksComponent;
  let fixture: ComponentFixture<OfficetasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficetasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficetasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

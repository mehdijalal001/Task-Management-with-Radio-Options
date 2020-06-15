import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficetaskformComponent } from './officetaskform.component';

describe('OfficetaskformComponent', () => {
  let component: OfficetaskformComponent;
  let fixture: ComponentFixture<OfficetaskformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficetaskformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficetaskformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

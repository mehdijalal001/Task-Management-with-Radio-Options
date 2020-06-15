import { TestBed } from '@angular/core/testing';

import { OfficetasksService } from './officetasks.service';

describe('OfficetasksService', () => {
  let service: OfficetasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficetasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

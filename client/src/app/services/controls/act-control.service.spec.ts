import { TestBed } from '@angular/core/testing';

import { ActControlService } from './act-control.service';

describe('ActService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActControlService = TestBed.get(ActControlService);
    expect(service).toBeTruthy();
  });
});

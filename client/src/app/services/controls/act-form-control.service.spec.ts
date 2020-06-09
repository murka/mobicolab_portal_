import { TestBed } from '@angular/core/testing';

import { ActFormControlService } from './act-form-control.service';

describe('ActFormControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActFormControlService = TestBed.get(ActFormControlService);
    expect(service).toBeTruthy();
  });
});

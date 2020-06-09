import { TestBed } from '@angular/core/testing';

import { LabsControlService } from './labs-control.service';

describe('LabsControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabsControlService = TestBed.get(LabsControlService);
    expect(service).toBeTruthy();
  });
});

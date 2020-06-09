import { TestBed } from '@angular/core/testing';

import { GeneralCustromerControlService } from './general-custromer-control.service';

describe('GeneralCustromerControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralCustromerControlService = TestBed.get(GeneralCustromerControlService);
    expect(service).toBeTruthy();
  });
});

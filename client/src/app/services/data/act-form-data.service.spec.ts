import { TestBed } from '@angular/core/testing';

import { ActFormDataService } from './act-form-data.service';

describe('ActFormDataService', () => {
  let service: ActFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

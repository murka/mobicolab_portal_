import { TestBed } from '@angular/core/testing';

import { CustomerControlService } from './customer-control.service';

describe('CustomerControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerControlService = TestBed.get(CustomerControlService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ActsTableService } from './acts-table.service';

describe('ActsTableService', () => {
  let service: ActsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OrderHistoryService } from './orderhistory.service';

describe('OrderHistoryService', () => {
  let service: OrderHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

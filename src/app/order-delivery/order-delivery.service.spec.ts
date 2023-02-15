import { TestBed } from '@angular/core/testing';

import { OrderDeliveryService } from './order-delivery.service';

describe('OrderDeliveryService', () => {
  let service: OrderDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

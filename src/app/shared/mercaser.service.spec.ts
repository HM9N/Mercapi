import { TestBed } from '@angular/core/testing';

import { MercaserService } from './mercaser.service';

describe('MercaserService', () => {
  let service: MercaserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercaserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

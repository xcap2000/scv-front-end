import { TestBed, inject } from '@angular/core/testing';

import { SellingProductService } from './selling-product.service';

describe('SellingProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellingProductService]
    });
  });

  it('should be created', inject([SellingProductService], (service: SellingProductService) => {
    expect(service).toBeTruthy();
  }));
});

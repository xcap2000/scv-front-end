import { TestBed, inject } from '@angular/core/testing';

import { SignInService } from './signin.service';

describe('SigninService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignInService]
    });
  });

  it('should be created', inject([SignInService], (service: SignInService) => {
    expect(service).toBeTruthy();
  }));
});

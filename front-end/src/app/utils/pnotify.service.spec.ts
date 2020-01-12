import { TestBed } from '@angular/core/testing';

import { PnotifyService } from './pnotify.service';

describe('PnotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PnotifyService = TestBed.get(PnotifyService);
    expect(service).toBeTruthy();
  });
});

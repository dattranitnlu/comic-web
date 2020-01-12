import { TestBed, async, inject } from '@angular/core/testing';

import { PreventReadingGuard } from './prevent-reading.guard';

describe('PreventReadingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventReadingGuard]
    });
  });

  it('should ...', inject([PreventReadingGuard], (guard: PreventReadingGuard) => {
    expect(guard).toBeTruthy();
  }));
});

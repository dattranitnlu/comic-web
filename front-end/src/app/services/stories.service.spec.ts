import { TestBed } from '@angular/core/testing';

import { StoriesService } from './stories.service';

describe('StoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoriesService = TestBed.get(StoriesService);
    expect(service).toBeTruthy();
  });
});

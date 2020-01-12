import { TestBed } from '@angular/core/testing';

import { StoryChaptersService } from './story-chapters.service';

describe('ChaptersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryChaptersService = TestBed.get(StoryChaptersService);
    expect(service).toBeTruthy();
  });
});

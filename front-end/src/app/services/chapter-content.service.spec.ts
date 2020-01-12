import { TestBed } from '@angular/core/testing';

import { ChapterContentService } from './chapter-content.service';

describe('ChapterContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChapterContentService = TestBed.get(ChapterContentService);
    expect(service).toBeTruthy();
  });
});

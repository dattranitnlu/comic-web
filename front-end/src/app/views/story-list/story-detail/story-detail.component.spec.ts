import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDetailComponent } from './story-detail.component';

describe('StoryDetailComponent', () => {
  let component: StoryDetailComponent;
  let fixture: ComponentFixture<StoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

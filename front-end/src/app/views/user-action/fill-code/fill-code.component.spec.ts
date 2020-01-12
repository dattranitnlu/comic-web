import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillCodeComponent } from './fill-code.component';

describe('FillCodeComponent', () => {
  let component: FillCodeComponent;
  let fixture: ComponentFixture<FillCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

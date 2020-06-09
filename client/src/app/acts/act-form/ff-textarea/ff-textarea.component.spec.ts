import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfTextareaComponent } from './ff-textarea.component';

describe('FfTextareaComponent', () => {
  let component: FfTextareaComponent;
  let fixture: ComponentFixture<FfTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusStepperComponent } from './status-stepper.component';

describe('StatusStepperComponent', () => {
  let component: StatusStepperComponent;
  let fixture: ComponentFixture<StatusStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

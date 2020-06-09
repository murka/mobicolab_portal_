import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfInputComponent } from './ff-input.component';

describe('FfInputComponent', () => {
  let component: FfInputComponent;
  let fixture: ComponentFixture<FfInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

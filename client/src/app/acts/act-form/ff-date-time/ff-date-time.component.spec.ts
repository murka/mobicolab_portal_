import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfDateTimeComponent } from './ff-date-time.component';

describe('FfDateTimeComponent', () => {
  let component: FfDateTimeComponent;
  let fixture: ComponentFixture<FfDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

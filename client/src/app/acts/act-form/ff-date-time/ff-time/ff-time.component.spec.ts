import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfTimeComponent } from './ff-time.component';

describe('FfTimeComponent', () => {
  let component: FfTimeComponent;
  let fixture: ComponentFixture<FfTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

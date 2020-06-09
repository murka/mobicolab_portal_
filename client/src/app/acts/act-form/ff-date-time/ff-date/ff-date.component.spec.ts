import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfDateComponent } from './ff-date.component';

describe('FfDataComponent', () => {
  let component: FfDateComponent;
  let fixture: ComponentFixture<FfDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

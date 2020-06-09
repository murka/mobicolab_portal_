import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfGroupSelectComponent } from './ff-group-select.component';

describe('FfGroupSelectComponent', () => {
  let component: FfGroupSelectComponent;
  let fixture: ComponentFixture<FfGroupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfGroupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

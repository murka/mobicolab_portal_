import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfSelectComponent } from './ff-select.component';

describe('FfManySelectWComponent', () => {
  let component: FfSelectComponent;
  let fixture: ComponentFixture<FfSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

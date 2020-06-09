import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfManySelectComponent } from './ff-many-select.component';

describe('FfManySelectComponent', () => {
  let component: FfManySelectComponent;
  let fixture: ComponentFixture<FfManySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfManySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfManySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

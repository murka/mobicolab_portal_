import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActApplitcationComponent } from './act-applitcation.component';

describe('ActApplitcationComponent', () => {
  let component: ActApplitcationComponent;
  let fixture: ComponentFixture<ActApplitcationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActApplitcationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActApplitcationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

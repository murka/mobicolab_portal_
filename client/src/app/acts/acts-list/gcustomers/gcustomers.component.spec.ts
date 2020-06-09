import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcustomersComponent } from './gcustomers.component';

describe('GcustomersComponent', () => {
  let component: GcustomersComponent;
  let fixture: ComponentFixture<GcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
